import { MutableRefObject } from "react";
import { WebGLRenderer } from "three";
import { sceneUpdateEvent } from "../threadEvents";
import { useSceneContext } from "../../context/context";

export interface StandardRuntimeConfig {
  currentFrameRef: MutableRefObject<number>;
  renderer: WebGLRenderer | null;
}

export const useStandardRuntime = ({
  currentFrameRef,
  renderer,
}: StandardRuntimeConfig) => {
  const { initializedScene, camera } = useSceneContext();

  const update = () => {
    sceneUpdateEvent();
    if (initializedScene.current && camera.current && renderer) {
      if (initializedScene.current?.orbitControls) {
        initializedScene.current.orbitControls.update();
      }
      // if (initializedScene.current?.animationManager.hasCameraAnimations()) {
      //   initializedScene.current.animationManager.startCameraAnimation(
      //     camera.current
      //   );
      // }
      // Render the scene using the renderer and camera directly
      renderer.render(initializedScene.current, camera.current);
    }
    currentFrameRef.current = requestAnimationFrame(update);
  };

  const pause = () => {
    cancelAnimationFrame(currentFrameRef.current);
  };

  return { update, pause };
};
