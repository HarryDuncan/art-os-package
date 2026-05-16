import { RefObject, useEffect } from "react";
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
import {
  bindRawWebglSamplerUniforms,
  setRawWebglNumericUniforms,
  setRawWebglUniform,
} from "./setRawWebglUniforms";
import { uploadRawWebglTextures } from "./uploadRawWebglTextures";

const IDENTITY_MAT4 = new Float32Array([
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
]);

const IDENTITY_MAT3 = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);

const PER_FRAME_UNIFORMS = new Set([
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

export const useRawWebglRenderer = (
  canvasRef: RefObject<HTMLCanvasElement>,
  shaderMaterial: RawWebglShaderMaterial,
  assets: Asset[],
  meshTransforms?: MeshTransformConfig[],
) => {
  const { setStatus } = useSceneContext();
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

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.positions, gl.STATIC_DRAW);

    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.normals, gl.STATIC_DRAW);

    const uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.uvs, gl.STATIC_DRAW);

    // The plane vertices are stored in row-major order so consecutive triples
    // are colinear. drawArrays(TRIANGLES, ...) on this buffer would therefore
    // render only degenerate (invisible) triangles — drawElements with the
    // index buffer is required for the TRIANGLES path. POINTS uses drawArrays
    // and ignores this buffer.
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW);

    // Mesh transforms -> per-vertex GL attributes. The three.js path runs
    // these via getMeshesFromConfig -> applyMeshTransforms -> setAttributes;
    // here we build them directly against the plane's vertex count and bind
    // them under the same `a_<key>` names the shader generator already
    // expects. Mismatched/unused attributes are skipped with a warning.
    const extraAttributes = buildRawWebglAttributes(
      meshTransforms,
      geometry.vertexCount,
      assets,
    );

    const textures = uploadRawWebglTextures(
      gl,
      shaderMaterial.textureBindings,
      assets,
    );

    const extraAttributeBindings = uploadRawWebglAttributes(
      gl,
      program,
      extraAttributes,
    );

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

    let viewportWidth = 0;
    let viewportHeight = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
      viewportWidth = w;
      viewportHeight = h;
      gl.viewport(0, 0, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();
    let rafId = 0;

    const draw = (now: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(program);

      if (attribs.position >= 0) {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(attribs.position);
        gl.vertexAttribPointer(attribs.position, 3, gl.FLOAT, false, 0, 0);
      }
      if (attribs.normal >= 0) {
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.enableVertexAttribArray(attribs.normal);
        gl.vertexAttribPointer(attribs.normal, 3, gl.FLOAT, false, 0, 0);
      }
      if (attribs.uv >= 0) {
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
        gl.enableVertexAttribArray(attribs.uv);
        gl.vertexAttribPointer(attribs.uv, 2, gl.FLOAT, false, 0, 0);
      }

      bindRawWebglAttributes(gl, extraAttributeBindings);

      setRawWebglNumericUniforms(
        gl,
        shaderMaterial.uniforms,
        getUniformLocation,
        PER_FRAME_UNIFORMS,
      );

      setRawWebglUniform(gl, getUniformLocation("uTime"), (now - start) / 1000);
      setRawWebglUniform(gl, getUniformLocation("uResolution"), [
        viewportWidth,
        viewportHeight,
      ]);
      setRawWebglUniform(gl, getUniformLocation("modelMatrix"), IDENTITY_MAT4);
      setRawWebglUniform(gl, getUniformLocation("viewMatrix"), IDENTITY_MAT4);
      setRawWebglUniform(
        gl,
        getUniformLocation("modelViewMatrix"),
        IDENTITY_MAT4,
      );
      setRawWebglUniform(
        gl,
        getUniformLocation("projectionMatrix"),
        IDENTITY_MAT4,
      );
      setRawWebglUniform(gl, getUniformLocation("normalMatrix"), IDENTITY_MAT3);

      bindRawWebglSamplerUniforms(gl, textures, getUniformLocation);

      if (DRAW_MODE === "TRIANGLES") {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, geometry.indexCount, gl.UNSIGNED_INT, 0);
      } else {
        gl.drawArrays(gl.POINTS, 0, geometry.vertexCount);
      }

      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    // Mirror the three.js path's `useThread` -> RUNNING transition so the
    // shared Loader (which hides on PROCESS_STATUS.RUNNING) dismisses once
    // the raw-webgl pipeline is up.
    setStatus(PROCESS_STATUS.RUNNING);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      textures.forEach(({ texture }) => gl.deleteTexture(texture));
      deleteRawWebglAttributes(gl, extraAttributeBindings);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(normalBuffer);
      gl.deleteBuffer(uvBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [canvasRef, shaderMaterial, assets, meshTransforms, setStatus]);
};
