/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { WebGLRenderer } from "three";
import PostProcessor from "../components/post-processor/PostProcessor";
import { sceneUpdateEvent } from "./threadEvents";
import { useSceneContext } from "../context/context";
import { PROCESS_STATUS } from "../consts/consts";
import { framePingPong } from "../post-processing/framePingPong";
import { PingPongRenderTargetConfig } from "../config/post-effects/findPostEffectTransforms";

export const useThreadWithPostProcessor = (
  currentFrameRef: MutableRefObject<number>,
  renderer: WebGLRenderer,
  postEffects: PingPongRenderTargetConfig[]
) => {
  const {
    dispatch,
    state: { initializedScene, status },
    camera,
  } = useSceneContext();
  console.log(postEffects);
  const postProcessor: MutableRefObject<null | PostProcessor> = useRef(null);
  const update = useCallback(() => {
    if (postProcessor.current?.isInitialized()) {
      sceneUpdateEvent();
      if (initializedScene) {
        if (initializedScene?.orbitControls) {
          initializedScene.orbitControls.update();
        }
        if (initializedScene?.animationManager.hasCameraAnimations()) {
          initializedScene.animationManager.startCameraAnimation(camera);
        }
      }

      postProcessor.current?.render();
      currentFrameRef.current = requestAnimationFrame(update);
    }
  }, [currentFrameRef, postProcessor, camera, initializedScene]);

  const pause = useCallback(() => {
    cancelAnimationFrame(currentFrameRef.current);
  }, [currentFrameRef]);

  useEffect(() => {
    const initPostProcessor = async () => {
      postProcessor.current = new PostProcessor(
        camera,
        initializedScene,
        renderer
      );
      initializedScene?.setRendererDimensions(
        renderer.domElement.clientHeight,
        renderer.domElement.clientWidth
      );
      initializedScene?.setStatus("active");
      // const { render, getCurrentTexture, dispose } = framePingPong(
      //   renderer,
      //   initializedScene,
      //   camera,
      //   "uRenderTarget",
      // );
      const isInitialized = await postProcessor.current.init();

      if (isInitialized) {
        dispatch({
          type: "UPDATE_STATUS",
          payload: { status: PROCESS_STATUS.READY_TO_RENDER },
        });
      }
    };
    if (initializedScene && camera && renderer && !postProcessor.current) {
      initPostProcessor();
    }
  }, [initializedScene, camera, renderer, postProcessor, dispatch]);

  useEffect(() => {
    if (status === PROCESS_STATUS.READY_TO_RENDER) {
      dispatch({
        type: "UPDATE_STATUS",
        payload: { status: PROCESS_STATUS.RUNNING },
      });
    }
    if (status === PROCESS_STATUS.RUNNING) {
      currentFrameRef.current = requestAnimationFrame(update);
    }

    return () => {
      pause();
    };
  }, [update, pause, status, dispatch, currentFrameRef]);

  return { update, pause };
};
