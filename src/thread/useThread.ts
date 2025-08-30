import { MutableRefObject, useEffect } from "react";
import { WebGLRenderer } from "three";
import { useSceneContext } from "../context/context";
import { PROCESS_STATUS } from "../consts/consts";
import { PingPongRenderTargetConfig } from "../config/post-effects/findPostEffectTransforms";
import { useRuntimeFactory } from "./runtimes/runtimeFactory";

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

  // Use the runtime factory to get the appropriate runtime
  const { update, pause } = useRuntimeFactory({
    currentFrameRef,
    renderer,
    postEffects,
  });

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
      // Clean up ping-pong instances if they exist
      // if (cleanup) {
      //   cleanup();
      // }
    };
  }, [update, pause, status, dispatch, currentFrameRef]);

  return { update, pause };
};
