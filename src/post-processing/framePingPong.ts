import {
  WebGLRenderTarget,
  ShaderMaterial,
  WebGLRenderer,
  Scene,
  Camera,
} from "three";
import { setUniforms } from "../interaction/utils";

/**
 * Handles ping-pong rendering between two render targets and passes the previous frame's
 * render target as a uniform to the provided shader material.
 *
 * @param renderer - The WebGLRenderer instance.
 * @param scene - The scene to render.
 * @param camera - The camera to use for rendering.
 * @param shaderMaterial - The ShaderMaterial whose uniform will be updated.
 * @param uniformName - The name of the uniform in the shader material to receive the render target's texture.
 * @param width - Width of the render targets.
 * @param height - Height of the render targets.
 */
export const framePingPong = (
  renderer: WebGLRenderer,
  initializedScene: Scene,
  scene: Scene,
  camera: Camera,
  materialId: string,

  width: number,
  height: number
) => {
  // Create two render targets for ping-ponging
  const rtA = new WebGLRenderTarget(width, height);
  const rtB = new WebGLRenderTarget(width, height);

  let readTarget = rtA;
  let writeTarget = rtB;

  return {
    render: () => {
      // Set the shader uniform to the previous frame's texture

      setUniforms(
        initializedScene as Scene,
        [materialId],
        ["uRenderTarget"],
        { uRenderTarget: readTarget.texture },
        "uRenderTarget"
      );
      // Render the scene to the write target
      renderer.setRenderTarget(writeTarget);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);

      // Swap the targets for the next frame
      const temp = readTarget;
      readTarget = writeTarget;
      writeTarget = temp;
    },
    getCurrentTexture: () => readTarget.texture,
    dispose: () => {
      rtA.dispose();
      rtB.dispose();
    },
  };
};
