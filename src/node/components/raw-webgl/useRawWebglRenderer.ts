import { RefObject, useEffect, useRef } from "react";
import { Asset } from "../../../assets/types";
import {
  MeshComponentConfig,
  MeshTransformConfig,
  RawWebglConfig,
} from "../../../config/config.types";
import { CameraConfig } from "../../../config/three-js/use-camera/camera.types";
import { PROCESS_STATUS } from "../../../consts/consts";
import {
  RawWebglBlending,
  RawWebglClearColor,
  RawWebglShaderMaterial,
  TRANSPARENT_CLEAR_COLOR,
} from "../../../config/material/shaders/raw-webgl/types";
import { useSceneContext } from "../../../context/context";
import { getJsModelCanvasRegistry } from "../../../consts/jsModelCanvasRegistry";
import { getJsModelUniformRegistry } from "../../../consts/jsModelUniformRegistry";
import { logWebGLGpuInfo } from "../../../utils/logWebGLGpuInfo";
import { packageConsole } from "../../../utils/packageConsole";
import { buildRawWebglCamera } from "./camera/buildRawWebglCamera";
import {
  buildRawWebglDrawItems,
  isRawWebglPlaneMesh,
  RawWebglDrawItem,
  RawWebglProgramEntry,
} from "./buildRawWebglDrawItems";
import { setRawWebglUniform } from "./setRawWebglUniforms";
import {
  createRawWebglTextureCache,
  createTextureUnitAllocator,
} from "./uploadRawWebglTextures";

export type RawWebglRendererScene = {
  shaderMaterials: RawWebglShaderMaterial[];
  assets: Asset[];
  meshComponentConfigs?: MeshComponentConfig[];
  meshTransforms?: MeshTransformConfig[];
  cameraConfig?: Partial<CameraConfig>;
  legacyConfig?: Partial<RawWebglConfig>;
};

type LiveCanvasTexture = {
  canvas: HTMLCanvasElement;
  texture: WebGLTexture;
  unit: number;
  width: number;
  height: number;
};

// Hot path uses raw WebGL + plain JS only. React is involved exclusively in
// the setup `useEffect` and a one-shot status flip; the rAF loop closes over
// local variables (no hooks, no state reads) so it can run cheaply on
// low-power hardware (e.g. Raspberry Pi installations).
export const useRawWebglRenderer = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  scene: RawWebglRendererScene | null,
  clearColor: RawWebglClearColor = TRANSPARENT_CLEAR_COLOR,
) => {
  // Spread into primitives so a caller passing an inline array can't rebuild
  // the whole GL pipeline on every render.
  const [clearRed, clearGreen, clearBlue, clearAlpha] = clearColor;

  // setStatus is snapshotted in a ref so the rAF loop never reaches into
  // React's render tree, and so context identity changes can't churn the
  // effect's dep array.
  const { setStatus } = useSceneContext();
  const setStatusRef = useRef(setStatus);
  setStatusRef.current = setStatus;

  useEffect(() => {
    // Background-only scenes (e.g. just a `videoBackground`) have no shader to
    // build. There's no GL work to do, but the shared Loader still has to be
    // dismissed or it covers the background forever.
    if (!scene || !scene.shaderMaterials.length) {
      setStatusRef.current(PROCESS_STATUS.RUNNING);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    packageConsole.log("[WebGL] creating raw WebGL2 context", {
      powerPreference: "(not set — browser default)",
      premultipliedAlpha: false,
      antialias: true,
    });
    const gl = canvas.getContext("webgl2", {
      // Transparent framebuffer so DOM layers behind the canvas (e.g. the
      // `videoBackground` element) show through where nothing is drawn.
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    });
    if (!gl) {
      packageConsole.error("useRawWebglRenderer: failed to acquire WebGL2 context");
      return;
    }
    logWebGLGpuInfo(gl, "raw WebGL2", {
      powerPreference: "(not set — browser default)",
    });

    // The legacy fullscreen plane is authored in clip space, so it ignores
    // the camera even if the scene carries a `cameraConfig`.
    const hasPlaneMeshes = (scene.meshComponentConfigs ?? []).some(isRawWebglPlaneMesh);
    const camera = buildRawWebglCamera(hasPlaneMeshes ? scene.cameraConfig : undefined);

    const textureUnits = createTextureUnitAllocator(gl);
    const textureCache = createRawWebglTextureCache(gl, scene.assets, textureUnits);
    const { items, programs, dispose } = buildRawWebglDrawItems({
      gl,
      meshComponentConfigs: scene.meshComponentConfigs,
      shaderMaterials: scene.shaderMaterials,
      meshTransforms: scene.meshTransforms,
      assets: scene.assets,
      viewMatrix: camera.viewMatrix,
      textureCache,
      legacyConfig: scene.legacyConfig,
    });
    if (!items.length) {
      packageConsole.warn("useRawWebglRenderer: no drawable meshes");
    }

    const usesDepth = items.some((item) => item.program.blending.depthTest);
    const clearMask = usesDepth
      ? gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT
      : gl.COLOR_BUFFER_BIT;
    gl.clearColor(clearRed, clearGreen, clearBlue, clearAlpha);

    // ---------------------------------------------------------------------
    // Viewport / resize. Projection and uResolution are re-uploaded lazily,
    // once per program, the next time each program is used.
    // ---------------------------------------------------------------------
    const resolution = new Float32Array(2);
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
      gl.viewport(0, 0, w, h);
      resolution[0] = w;
      resolution[1] = h;
      camera.setAspect(w / h);
      for (let i = 0; i < programs.length; i += 1) {
        programs[i].projectionDirty = true;
        programs[i].resolutionDirty = true;
      }
    };
    resize();
    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    if (resizeObserver) resizeObserver.observe(canvas);
    else window.addEventListener("resize", resize);

    // ---------------------------------------------------------------------
    // Registry-driven inputs (JS-class models, remote streams). Callbacks
    // are created once and read `activeProgram` so the per-frame
    // Map.forEach calls allocate nothing.
    // ---------------------------------------------------------------------
    let activeProgram: RawWebglProgramEntry | null = null;
    const applyRegistryUniform = (value: unknown, uniformId: string) => {
      if (!activeProgram) return;
      const location = activeProgram.handles.getUniformLocation(uniformId);
      if (location === null) return;
      setRawWebglUniform(gl, location, value as never);
      // The material's cached value no longer matches what's on the GPU.
      const overwritten = activeProgram.materialUniformsByName.get(uniformId);
      if (overwritten) overwritten.last = undefined;
    };

    const liveCanvases = new Map<string, LiveCanvasTexture>();
    const uploadLiveCanvas = (canvasEl: HTMLCanvasElement, uniformId: string) => {
      const width = canvasEl.width || 1;
      const height = canvasEl.height || 1;
      let entry = liveCanvases.get(uniformId);
      if (!entry) {
        const users = programs.filter(
          (p) => p.handles.getUniformLocation(uniformId) !== null,
        );
        if (!users.length) return;
        const unit = textureUnits.allocate();
        if (unit === null) return;
        const texture = gl.createTexture();
        if (!texture) return;
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, canvasEl);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        for (let i = 0; i < users.length; i += 1) {
          gl.useProgram(users[i].handles.program);
          gl.uniform1i(users[i].handles.getUniformLocation(uniformId), unit);
        }
        activeProgram = null;
        liveCanvases.set(uniformId, { canvas: canvasEl, texture, unit, width, height });
        return;
      }
      gl.activeTexture(gl.TEXTURE0 + entry.unit);
      gl.bindTexture(gl.TEXTURE_2D, entry.texture);
      if (entry.canvas !== canvasEl || entry.width !== width || entry.height !== height) {
        // texSubImage2D can't change the texture size; reallocate instead.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, canvasEl);
        entry.canvas = canvasEl;
        entry.width = width;
        entry.height = height;
      } else {
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, canvasEl);
      }
    };

    // ---------------------------------------------------------------------
    // Per-program, once-per-frame uploads.
    // ---------------------------------------------------------------------
    const uniformRegistry = getJsModelUniformRegistry();
    const canvasRegistry = getJsModelCanvasRegistry();
    let time = 0;

    const prepareProgram = (program: RawWebglProgramEntry, frameId: number) => {
      const { locations } = program;
      if (locations.uTime !== null) gl.uniform1f(locations.uTime, time);
      if (program.resolutionDirty) {
        if (locations.uResolution !== null) gl.uniform2fv(locations.uResolution, resolution);
        program.resolutionDirty = false;
      }
      if (program.projectionDirty) {
        if (locations.projectionMatrix !== null) {
          gl.uniformMatrix4fv(locations.projectionMatrix, false, camera.projectionMatrix);
        }
        program.projectionDirty = false;
      }
      const uniforms = program.materialUniforms;
      for (let i = 0; i < uniforms.length; i += 1) {
        const entry = uniforms[i];
        const value = entry.uniform.value;
        if (typeof value === "number") {
          if (value === entry.last) continue;
          gl.uniform1f(entry.location, value);
          entry.last = value;
        } else if (Array.isArray(value)) {
          if (sameNumbers(entry.last, value)) continue;
          setRawWebglUniform(gl, entry.location, value);
          entry.last = value.slice();
        } else {
          setRawWebglUniform(gl, entry.location, value);
        }
      }
      // Streamed values win over the scene's static uniforms.
      if (uniformRegistry.size) uniformRegistry.forEach(applyRegistryUniform);
      program.frameId = frameId;
    };

    const uploadItemMatrices = (item: RawWebglDrawItem) => {
      const { locations } = item.program;
      if (locations.modelMatrix !== null) {
        gl.uniformMatrix4fv(locations.modelMatrix, false, item.modelMatrix);
      }
      if (locations.modelViewMatrix !== null) {
        gl.uniformMatrix4fv(locations.modelViewMatrix, false, item.modelViewMatrix);
      }
      if (locations.normalMatrix !== null) {
        gl.uniformMatrix3fv(locations.normalMatrix, false, item.normalMatrix);
      }
      item.program.lastItem = item;
    };

    let appliedBlending: RawWebglBlending | null = null;
    const applyBlending = (blending: RawWebglBlending) => {
      if (
        appliedBlending &&
        appliedBlending.transparent === blending.transparent &&
        appliedBlending.blendSrc === blending.blendSrc &&
        appliedBlending.blendDst === blending.blendDst &&
        appliedBlending.depthTest === blending.depthTest
      ) {
        return;
      }
      if (blending.transparent) {
        gl.enable(gl.BLEND);
        // Alpha uses its own factors (as three.js does for a non-premultiplied
        // context). Running alpha through the colour factors instead would
        // square it against the transparent clear colour, so fragments would
        // composite far weaker than their shader alpha over the background.
        gl.blendFuncSeparate(blending.blendSrc, blending.blendDst, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      } else {
        gl.disable(gl.BLEND);
      }
      if (blending.depthTest) gl.enable(gl.DEPTH_TEST);
      else gl.disable(gl.DEPTH_TEST);
      appliedBlending = blending;
    };

    // ---------------------------------------------------------------------
    // Hot loop. Closes over local variables only — no hooks, no React
    // reads, no string lookups, no allocations.
    // ---------------------------------------------------------------------
    const start = performance.now();
    let frameId = 0;
    let rafId = 0;

    const draw = (now: number) => {
      frameId += 1;
      time = (now - start) * 0.001;

      textureCache.uploadVideoFrames();

      if (canvasRegistry.size) {
        // Canvas -> WebGL has a Y-flip; scoped to the canvas uploads only.
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        canvasRegistry.forEach(uploadLiveCanvas);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      }

      gl.clear(clearMask);

      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        const { program } = item;
        if (program !== activeProgram) {
          gl.useProgram(program.handles.program);
          activeProgram = program;
        }
        if (program.frameId !== frameId) prepareProgram(program, frameId);
        if (program.lastItem !== item) uploadItemMatrices(item);
        applyBlending(program.blending);

        gl.bindVertexArray(item.vao);
        if (item.indexType === null) gl.drawArrays(item.mode, 0, item.count);
        else gl.drawElements(item.mode, item.count, item.indexType, 0);
      }

      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    // Mirror the three.js path's `useThread` -> RUNNING transition so the
    // shared Loader (which hides on PROCESS_STATUS.RUNNING) dismisses once
    // the raw-webgl pipeline is up.
    setStatusRef.current(PROCESS_STATUS.RUNNING);

    return () => {
      cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener("resize", resize);
      gl.bindVertexArray(null);
      dispose();
      textureCache.dispose();
      liveCanvases.forEach(({ texture }) => gl.deleteTexture(texture));
    };
  }, [canvasRef, scene, clearRed, clearGreen, clearBlue, clearAlpha]);
};

const sameNumbers = (last: number | number[] | undefined, value: number[]) => {
  if (!Array.isArray(last) || last.length !== value.length) return false;
  for (let i = 0; i < value.length; i += 1) {
    if (last[i] !== value[i]) return false;
  }
  return true;
};
