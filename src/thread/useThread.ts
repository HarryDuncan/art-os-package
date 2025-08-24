/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { MutableRefObject, useCallback, useEffect } from "react";
import { WebGLRenderer } from "three";
import { sceneUpdateEvent } from "./threadEvents";
import { useSceneContext } from "../context/context";
import { PROCESS_STATUS } from "../consts/consts";
import { PingPongRenderTargetConfig } from "../config/post-effects/findPostEffectTransforms";

export const useThread = (
  currentFrameRef: MutableRefObject<number>,
  renderer: WebGLRenderer,
  postEffects: PingPongRenderTargetConfig[]
) => {
  const {
    dispatch,
    state: { initializedScene, status },
    camera,
  } = useSceneContext();

  // No postProcessor, just use renderer/camera/scene directly

  const update = useCallback(() => {
    sceneUpdateEvent();
    if (initializedScene) {
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
  }, [currentFrameRef, camera, initializedScene, renderer]);

  const pause = useCallback(() => {
    cancelAnimationFrame(currentFrameRef.current);
  }, [currentFrameRef]);

  useEffect(() => {
    // Set renderer dimensions and status as before
    if (initializedScene && camera && renderer) {
      initializedScene.setRendererDimensions(
        renderer.domElement.clientHeight,
        renderer.domElement.clientWidth
      );
      initializedScene.setStatus("active");
      // Immediately ready to render, no async postProcessor init
      dispatch({
        type: "UPDATE_STATUS",
        payload: { status: PROCESS_STATUS.READY_TO_RENDER },
      });
    }
  }, [initializedScene, camera, renderer, dispatch]);

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
