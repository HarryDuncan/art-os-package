import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { Camera, WebGLRenderer } from "three";
import PostProcessor from "../../components/post-processor/PostProcessor";
import { sceneUpdateEvent } from "../../engine/engineEvents";
import { useSceneContext } from "../../context/context";

export const useThreadWithPostProcessor = (
  currentFrameRef: MutableRefObject<number>,
  camera: Camera,
  renderer: WebGLRenderer,
  _passes: any[]
) => {
  const {
    state: { initializedScene },
  } = useSceneContext();
  const postProcessor: MutableRefObject<null | PostProcessor> = useRef(null);

  const update = useCallback(async () => {
    const { Pass } = await import("three/examples/jsm/postprocessing/Pass.js");
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
    if (initializedScene) {
      update();
    }
  }, [initializedScene, update]);

  useEffect(() => {
    initializeSceneWithData();
    return () => {
      pause();
    };
  }, [initializeSceneWithData, pause]);

  return { update, pause };
};
