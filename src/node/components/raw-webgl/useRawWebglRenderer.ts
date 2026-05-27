import { RefObject, useEffect, useRef } from "react";
import { Asset } from "../../../assets/types";
import { MeshTransformConfig } from "../../../config/config.types";
import { PROCESS_STATUS } from "../../../consts/consts";
import { RawWebglShaderMaterial } from "../../../config/material/shaders/raw-webgl/types";
import { useSceneContext } from "../../../context/context";
import { buildRawWebglProgram } from "./compileRawWebglProgram";
import { createPlaneGeometry } from "./createPlaneGeometry";
import { buildRawWebglAttributes } from "./mesh-transforms/buildRawWebglAttributes";
import {
  bindRawWebglAttributes,
  deleteRawWebglAttributes,
  uploadRawWebglAttributes,
} from "./mesh-transforms/uploadRawWebglAttributes";
import { setRawWebglUniform } from "./setRawWebglUniforms";
import { uploadRawWebglTextures } from "./uploadRawWebglTextures";
import { getJsModelCanvasRegistry } from "../../../consts/jsModelCanvasRegistry";

// Identity matrices used to satisfy the three.js-shaped builtins the shader
// generator emits. They never change at runtime, so we upload them once at
// program-link time (see "set static uniforms ONCE" below) and never touch
// them in the hot loop.
const IDENTITY_MAT4 = new Float32Array([
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
]);
const IDENTITY_MAT3 = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);

// Names of uniforms the renderer drives itself. Anything in this set is
// excluded from the per-frame "user uniforms" walk so the user-side scene
// config can't fight the renderer for control of these slots.
const RENDERER_OWNED_UNIFORMS = new Set([
  "uTime",
  "uResolution",
  "modelMatrix",
  "viewMatrix",
  "modelViewMatrix",
  "projectionMatrix",
  "normalMatrix",
]);

// TODO: drive this from the scene config (e.g.
// `sceneConfig.meshComponentConfigs[0].meshType`) so each material can pick its
// primitive. For now we default to TRIANGLES (which renders the subdivided
// plane as a solid surface via the index buffer) and expose POINTS as the
// alternative used by point-cloud-style shaders.
type DrawMode = "TRIANGLES" | "POINTS";
// `as DrawMode` widens the literal so TS doesn't flag the if/else below as a
// "no overlap" comparison; the value is still constrained to the union.
const DRAW_MODE = "POINTS" as DrawMode;

// Hot path uses raw WebGL + plain JS only. React is involved exclusively in
// the setup `useEffect` and a one-shot status flip; the rAF loop closes over
// local variables (no hooks, no state reads) so it can run cheaply on
// low-power hardware (e.g. Raspberry Pi installations).
export const useRawWebglRenderer = (
  canvasRef: RefObject<HTMLCanvasElement>,
  shaderMaterial: RawWebglShaderMaterial,
  assets: Asset[],
  meshTransforms?: MeshTransformConfig[],
) => {
  // setStatus is read once per render and snapshotted in a ref so the rAF
  // loop never reaches into React's render tree, and so changes to the
  // context value identity can't churn the effect's dep array.
  const { setStatus } = useSceneContext();
  const setStatusRef = useRef(setStatus);
  setStatusRef.current = setStatus;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      premultipliedAlpha: false,
      antialias: true,
    });
    if (!gl) {
      console.error("useRawWebglRenderer: failed to acquire WebGL2 context");
      return;
    }

    let handles;
    try {
      handles = buildRawWebglProgram(
        gl,
        shaderMaterial.vertexShader,
        shaderMaterial.fragmentShader,
      );
    } catch (error) {
      console.error("useRawWebglRenderer: program build failed", error);
      return;
    }

    const {
      program,
      vertexShader,
      fragmentShader,
      attribs,
      getUniformLocation,
    } = handles;

    const geometry = createPlaneGeometry();

    // ---------------------------------------------------------------------
    // Vertex Array Object: bake all attribute pointer + element-buffer state
    // once so the render loop just needs `gl.bindVertexArray(vao)` to restore
    // it. Major win on low-power GPUs vs re-binding every buffer per frame.
    // ---------------------------------------------------------------------
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.positions, gl.STATIC_DRAW);
    if (attribs.position >= 0) {
      gl.enableVertexAttribArray(attribs.position);
      gl.vertexAttribPointer(attribs.position, 3, gl.FLOAT, false, 0, 0);
    }

    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.normals, gl.STATIC_DRAW);
    if (attribs.normal >= 0) {
      gl.enableVertexAttribArray(attribs.normal);
      gl.vertexAttribPointer(attribs.normal, 3, gl.FLOAT, false, 0, 0);
    }

    const uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.uvs, gl.STATIC_DRAW);
    if (attribs.uv >= 0) {
      gl.enableVertexAttribArray(attribs.uv);
      gl.vertexAttribPointer(attribs.uv, 2, gl.FLOAT, false, 0, 0);
    }

    // The plane vertices are stored in row-major order so consecutive triples
    // are colinear. drawArrays(TRIANGLES, ...) on this buffer would therefore
    // render only degenerate (invisible) triangles — drawElements with the
    // index buffer is required for the TRIANGLES path. POINTS uses drawArrays
    // and ignores this buffer.
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW);

    // Mesh transforms -> per-vertex GL attributes. Same `a_<key>` naming as
    // the three.js path. The bind call recorded into the VAO so the loop
    // doesn't re-bind these either.
    const extraAttributes = buildRawWebglAttributes(
      meshTransforms,
      geometry.vertexCount,
      assets,
    );
    const extraAttributeBindings = uploadRawWebglAttributes(
      gl,
      program,
      extraAttributes,
    );
    bindRawWebglAttributes(gl, extraAttributeBindings);

    gl.bindVertexArray(null);

    // ---------------------------------------------------------------------
    // One-time GL state: blending, depth, clear color, current program.
    // ---------------------------------------------------------------------
    const { blending } = shaderMaterial;
    if (blending.transparent) {
      gl.enable(gl.BLEND);
      gl.blendFunc(blending.blendSrc, blending.blendDst);
    } else {
      gl.disable(gl.BLEND);
    }
    if (blending.depthTest) {
      gl.enable(gl.DEPTH_TEST);
    } else {
      gl.disable(gl.DEPTH_TEST);
    }
    gl.clearColor(0, 0, 0, 0);

    // The renderer owns this program for its entire lifetime; setting it
    // once here and never re-setting it removes a state call per frame.
    gl.useProgram(program);

    // ---------------------------------------------------------------------
    // Cache uniform locations and set "static" uniforms once. After this,
    // the hot loop never queries any uniform location by string.
    // ---------------------------------------------------------------------
    const uTimeLocation = getUniformLocation("uTime");
    const uResolutionLocation = getUniformLocation("uResolution");
    // Pre-allocated; reused on every resize so we don't churn GC.
    const uResolutionValue = new Float32Array(2);

    const setStaticMatrix = (
      name: string,
      value: Float32Array,
      isMat3: boolean,
    ) => {
      const location = getUniformLocation(name);
      if (location === null) return;
      if (isMat3) gl.uniformMatrix3fv(location, false, value);
      else gl.uniformMatrix4fv(location, false, value);
    };
    setStaticMatrix("modelMatrix", IDENTITY_MAT4, false);
    setStaticMatrix("viewMatrix", IDENTITY_MAT4, false);
    setStaticMatrix("modelViewMatrix", IDENTITY_MAT4, false);
    setStaticMatrix("projectionMatrix", IDENTITY_MAT4, false);
    setStaticMatrix("normalMatrix", IDENTITY_MAT3, true);

    // Pre-build the per-frame numeric uniform list. Each entry holds the
    // resolved location AND a reference to the uniform OBJECT (not a snapshot
    // of `.value`), so external mutation of `shaderMaterial.uniforms[x].value`
    // is picked up on the next frame without any React or string-lookup work.
    type PerFrameUniform = {
      location: WebGLUniformLocation;
      uniform: { value: unknown };
    };
    const perFrameUniforms: PerFrameUniform[] = [];
    const uniformNames = Object.keys(shaderMaterial.uniforms);
    for (let i = 0; i < uniformNames.length; i += 1) {
      const name = uniformNames[i];
      if (RENDERER_OWNED_UNIFORMS.has(name)) continue;
      const location = getUniformLocation(name);
      if (location === null) continue;
      perFrameUniforms.push({
        location,
        uniform: shaderMaterial.uniforms[name] as { value: unknown },
      });
    }

    // ---------------------------------------------------------------------
    // Textures: assign each sampler to its texture unit and leave the
    // texture bound for the lifetime of the renderer. Samplers don't change
    // unit assignments, so the hot loop never touches gl.activeTexture /
    // gl.bindTexture / gl.uniform1i again.
    // ---------------------------------------------------------------------
    const textures = uploadRawWebglTextures(
      gl,
      shaderMaterial.textureBindings,
      assets,
    );
    for (let i = 0; i < textures.length; i += 1) {
      const t = textures[i];
      gl.activeTexture(gl.TEXTURE0 + t.unitIndex);
      gl.bindTexture(gl.TEXTURE_2D, t.texture);
      const location = getUniformLocation(t.uniformId);
      if (location !== null) gl.uniform1i(location, t.unitIndex);
    }

    // ---------------------------------------------------------------------
    // Viewport / resize. uResolution is uploaded ONLY when the size changes,
    // not every frame. The shader sees the latest value via WebGL's retained
    // uniform state.
    // ---------------------------------------------------------------------
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
      gl.viewport(0, 0, w, h);
      uResolutionValue[0] = w;
      uResolutionValue[1] = h;
      if (uResolutionLocation !== null) {
        gl.uniform2fv(uResolutionLocation, uResolutionValue);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // ---------------------------------------------------------------------
    // Live canvas textures (JS-class model outputs, e.g. person mask).
    // The registry is populated asynchronously (after MediaPipe warms up),
    // so we lazily allocate a WebGLTexture the first time each canvas
    // appears and then re-upload its pixels every frame with texSubImage2D.
    // ---------------------------------------------------------------------
    type LiveCanvasTex = {
      canvas: HTMLCanvasElement;
      texture: WebGLTexture;
      unitIndex: number;
    };
    const liveCanvasByUniform = new Map<string, LiveCanvasTex>();
    let nextCanvasUnit = textures.length; // static textures occupy units 0..N-1

    // Bind the VAO once; nothing else in this renderer ever switches it.
    gl.bindVertexArray(vao);

    // ---------------------------------------------------------------------
    // Hot loop. Closes over local variables only — no hooks, no React
    // reads, no string lookups, no allocations.
    // ---------------------------------------------------------------------
    const start = performance.now();
    const indexCount = geometry.indexCount;
    const vertexCount = geometry.vertexCount;
    const drawTriangles = DRAW_MODE === "TRIANGLES";
    let rafId = 0;

    const draw = (now: number) => {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      if (uTimeLocation !== null) {
        gl.uniform1f(uTimeLocation, (now - start) * 0.001);
      }

      // for-i over a pre-built array (cheaper than forEach / Object.entries
      // because the callback closure isn't reallocated per call and there's
      // no iterator allocation).
      for (let i = 0; i < perFrameUniforms.length; i += 1) {
        const entry = perFrameUniforms[i];
        // setRawWebglUniform dispatches on the JS shape of `value` — fine for
        // our scale; specialise to a baked setter per entry if we ever need
        // to squeeze more out of this loop.
        setRawWebglUniform(
          gl,
          entry.location,
          entry.uniform.value as never,
        );
      }

      // ── JS-class canvas textures ────────────────────────────────────────
      // Canvas → WebGL has a Y-flip: set UNPACK_FLIP_Y_WEBGL so the texture
      // is right-way-up. Reset to 0 afterwards so it doesn't affect anything
      // else. Only runs until all canvases are claimed; after that the
      // forEach body returns immediately every call.
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

      getJsModelCanvasRegistry().forEach((canvas, uniformId) => {
        if (liveCanvasByUniform.has(uniformId)) return;
        const location = getUniformLocation(uniformId);
        if (location === null) return; // not used in this shader
        const unitIndex = nextCanvasUnit;
        nextCanvasUnit += 1;
        const texture = gl.createTexture();
        if (!texture) return;
        gl.activeTexture(gl.TEXTURE0 + unitIndex);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          canvas.width || 1,
          canvas.height || 1,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          canvas,
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.uniform1i(location, unitIndex);
        liveCanvasByUniform.set(uniformId, { canvas, texture, unitIndex });
      });

      // Push fresh canvas pixels to the GPU before drawing.
      liveCanvasByUniform.forEach(({ canvas, texture, unitIndex }) => {
        gl.activeTexture(gl.TEXTURE0 + unitIndex);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texSubImage2D(
          gl.TEXTURE_2D,
          0,
          0,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          canvas,
        );
      });

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);

      if (drawTriangles) {
        gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_INT, 0);
      } else {
        gl.drawArrays(gl.POINTS, 0, vertexCount);
      }

      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    // Mirror the three.js path's `useThread` -> RUNNING transition so the
    // shared Loader (which hides on PROCESS_STATUS.RUNNING) dismisses once
    // the raw-webgl pipeline is up. Read via ref so this path doesn't pull
    // setStatus into the effect's dep array.
    setStatusRef.current(PROCESS_STATUS.RUNNING);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      gl.bindVertexArray(null);
      gl.deleteVertexArray(vao);
      for (let i = 0; i < textures.length; i += 1) {
        gl.deleteTexture(textures[i].texture);
      }
      liveCanvasByUniform.forEach(({ texture }) => gl.deleteTexture(texture));
      deleteRawWebglAttributes(gl, extraAttributeBindings);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(normalBuffer);
      gl.deleteBuffer(uvBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [canvasRef, shaderMaterial, assets, meshTransforms]);
};
