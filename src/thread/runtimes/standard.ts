import { MutableRefObject } from "react";
import { WebGLRenderer } from "three";
import PostProcessor from "../../components/post-processor/PostProcessor";
import { sceneUpdateEvent } from "../threadEvents";
import { useSceneContext } from "../../context/context";

export interface StandardRuntimeConfig {
  currentFrameRef: MutableRefObject<number>;
  renderer: WebGLRenderer;
  postProcessor: MutableRefObject<null | PostProcessor>;
}

export const useStandardRuntime = ({
  currentFrameRef,
  postProcessor,
}: StandardRuntimeConfig) => {
  const {
    state: { initializedScene },
    camera,
  } = useSceneContext();

  const update = () => {
    if (postProcessor.current?.isInitialized()) {
      sceneUpdateEvent();
      if (initializedScene) {
        if (initializedScene?.orbitControls) {
          initializedScene.orbitControls.update();
        }
        if (
          initializedScene?.animationManager.hasCameraAnimations() &&
          camera
        ) {
          initializedScene.animationManager.startCameraAnimation(camera);
        }
      }

      postProcessor.current?.render();
      currentFrameRef.current = requestAnimationFrame(update);
    }
  };

  const pause = () => {
    cancelAnimationFrame(currentFrameRef.current);
  };

  return { update, pause };
};
