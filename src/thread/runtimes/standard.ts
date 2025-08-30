import { MutableRefObject } from "react";
import { WebGLRenderer } from "three";
import { sceneUpdateEvent } from "../threadEvents";
import { useSceneContext } from "../../context/context";

export interface StandardRuntimeConfig {
  currentFrameRef: MutableRefObject<number>;
  renderer: WebGLRenderer;
}

export const useStandardRuntime = ({
  currentFrameRef,
  renderer,
}: StandardRuntimeConfig) => {
  const {
    state: { initializedScene },
    camera,
  } = useSceneContext();

  const update = () => {
    sceneUpdateEvent();
    if (initializedScene && camera) {
      if (initializedScene?.orbitControls) {
        initializedScene.orbitControls.update();
      }
      if (initializedScene?.animationManager.hasCameraAnimations()) {
        initializedScene.animationManager.startCameraAnimation(camera);
      }
      // Render the scene using the renderer and camera directly
      renderer.render(initializedScene, camera);
    }
    currentFrameRef.current = requestAnimationFrame(update);
  };

  const pause = () => {
    cancelAnimationFrame(currentFrameRef.current);
  };

  return { update, pause };
};
