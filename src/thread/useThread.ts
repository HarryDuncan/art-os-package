/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { MutableRefObject, useEffect, useRef } from "react";
import { WebGLRenderer } from "three";
import PostProcessor from "../components/post-processor/PostProcessor";
import { useSceneContext } from "../context/context";
import { RuntimeType } from "./thread.consts";
import { useStandardRuntime } from "./runtimes/standard";
import { useVRRuntime } from "./runtimes/vrRuntime";
import { PROCESS_STATUS } from "../consts/consts";

export interface UseThreadConfig {
  currentFrameRef: MutableRefObject<number>;
  renderer: WebGLRenderer;
  runtime?: RuntimeType;
}

export const useThread = ({
  currentFrameRef,
  renderer,
  runtime = "standard",
}: UseThreadConfig) => {
  const {
    dispatch,
    state: { initializedScene, status },
    camera,
  } = useSceneContext();

  const postProcessor: MutableRefObject<null | PostProcessor> = useRef(null);

  // Initialize post processor
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

  // Set up renderer for VR if needed
  useEffect(() => {
    if (runtime === "vr" && renderer) {
      renderer.xr.enabled = true;
    }
  }, [runtime, renderer]);

  // Get the appropriate runtime
  const standardRuntime = useStandardRuntime({
    currentFrameRef,
    renderer,
    postProcessor,
  });

  const vrRuntime = useVRRuntime({
    currentFrameRef,
    renderer,
    postProcessor,
  });

  // Select runtime based on prop
  const selectedRuntime = runtime === "vr" ? vrRuntime : standardRuntime;

  // Start rendering when ready
  useEffect(() => {
    if (status === PROCESS_STATUS.READY_TO_RENDER) {
      dispatch({
        type: "UPDATE_STATUS",
        payload: { status: PROCESS_STATUS.RUNNING },
      });
    }
    if (status === PROCESS_STATUS.RUNNING) {
      currentFrameRef.current = requestAnimationFrame(selectedRuntime.update);
    }

    return () => {
      selectedRuntime.pause();
    };
  }, [selectedRuntime, status, dispatch, currentFrameRef]);

  return {
    update: selectedRuntime.update,
    pause: selectedRuntime.pause,
    ...(runtime === "vr" && { initVR: vrRuntime.initVR }),
  };
};
