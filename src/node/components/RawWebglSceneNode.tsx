import { SceneConfig } from "../../config/config.types";

// TODO: Skeleton "scene node" for the `webgl` engine, parallel to
// `SceneDisplay` for the three.js engine. Renders raw WebGL output
// directly rather than going through three.js.
export const RawWebglSceneNode = ({
  sceneConfig,
}: {
  sceneConfig: SceneConfig;
}) => {
  // TODO: Acquire a render surface. Per spec, raw WebGL is expected to be
  //       rendered through a video component (likely a <video> element fed
  //       by a WebGL-driven MediaStream / captureStream, similar to
  //       `VideoBackground.tsx`). Until that is wired up, this is a no-op.

  // TODO: Create and own the WebGLRenderingContext / WebGL2RenderingContext
  //       (or pull it from a shared scene context) and manage its lifecycle
  //       (creation, resize on window changes, dispose on unmount).

  // TODO: Apply scene properties (viewWidth, viewHeight, backgroundColor,
  //       videoBackground, position, zIndex, etc.) to the render surface,
  //       mirroring `RootContainer.tsx`.

  // TODO: Compile / link shader programs derived from `sceneConfig` and
  //       upload geometry + textures to the GL context.

  // TODO: Drive the render loop (requestAnimationFrame) and integrate with
  //       the existing thread/runtime layer where appropriate.

  // TODO: Surface lifecycle status updates via `useSceneContext` →
  //       `setProcessStatus`, matching the three.js code path.

  // TODO: Use `sceneConfig` once the raw WebGL pipeline is implemented.
  void sceneConfig;

  return null;
};
