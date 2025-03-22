import { RefObject, useCallback, useEffect, useRef } from "react";
import { Camera, WebGLRenderer } from "three";
import { Pass } from "three/examples/jsm/postprocessing/Pass";
import PostProcessor from "../../components/post-processor/PostProcessor";
import { sceneUpdateEvent } from "../../engine/engineEvents";
import { useSceneContext } from "../../context/context";

export const useThreadWithPostProcessor = (
  currentFrameRef: RefObject<number>,
  camera: Camera,
  renderer: WebGLRenderer,
  _passes: Pass[]
) => {
  const {
    state: { initializedScene },
  } = useSceneContext();
  const postProcessor: RefObject<null | PostProcessor> = useRef(null);

  const update = useCallback(() => {
    sceneUpdateEvent();
    if (initializedScene) {
      if (initializedScene?.orbitControls) {
        initializedScene.orbitControls.update();
      }
      if (initializedScene?.animationManager.hasCameraAnimations()) {
        initializedScene.animationManager.startCameraAnimation(camera);
      }
    }

    // @ts-ignore
    postProcessor.current?.render(performance.now());
    currentFrameRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(currentFrameRef.current);
    };
  }, [currentFrameRef, postProcessor, camera, initializedScene]);

  const pause = useCallback(() => {
    cancelAnimationFrame(currentFrameRef.current);
  }, [currentFrameRef]);

  useEffect(() => {
    if (initializedScene && camera && renderer && !postProcessor.current) {
      postProcessor.current = new PostProcessor(
        camera,
        initializedScene,
        renderer
      );
    }
  }, [initializedScene, camera, renderer, postProcessor]);

  const initializeSceneWithData = useCallback(() => {
    if (postProcessor.current) {
      update();
    }
  }, [update, postProcessor]);

  useEffect(() => {
    initializeSceneWithData();
    return () => {
      pause();
    };
  }, [initializeSceneWithData, pause]);
};
