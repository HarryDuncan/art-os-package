import { MutableRefObject, useEffect } from "react";
import { Camera, WebGLRenderer } from "three";
import { useSceneContext } from "../context/context";
import { PROCESS_STATUS } from "../consts/consts";
import { PingPongRenderTargetConfig } from "../config/post-effects/findPostEffectTransforms";
import { useRuntimeFactory } from "./runtimes/runtimeFactory";
import { InteractiveScene } from "../components/interactive-scene/InteractiveScene";

export const useThread = (
  currentFrameRef: MutableRefObject<number>,
  renderer: WebGLRenderer,
  postEffects: PingPongRenderTargetConfig[],
  setExternalScene?: (
    scene: InteractiveScene | null,
    camera: Camera | null
  ) => void
) => {
  const { setStatus, initializedScene, sceneStatus, camera } =
    useSceneContext();

  // Use the runtime factory to get the appropriate runtime
  const { update, pause } = useRuntimeFactory({
    currentFrameRef,
    renderer,
    postEffects,
  });

  useEffect(() => {
    // Set renderer dimensions and status as before
    if (initializedScene.current && camera.current && renderer) {
      initializedScene.current.setRendererDimensions(
        renderer.domElement.clientHeight,
        renderer.domElement.clientWidth
      );
      initializedScene.current.setStatus("active");
      if (setExternalScene) {
        setExternalScene(initializedScene.current, camera.current);
      }
      // Immediately ready to render, no async postProcessor init
      setStatus(PROCESS_STATUS.READY_TO_RENDER);
    }
  }, [initializedScene, camera, renderer, setStatus]);

  useEffect(() => {
    if (sceneStatus === PROCESS_STATUS.READY_TO_RENDER) {
      setStatus(PROCESS_STATUS.RUNNING);
    }
    if (sceneStatus === PROCESS_STATUS.RUNNING) {
      currentFrameRef.current = requestAnimationFrame(update);
    }

    return () => {
      pause();
      // Clean up ping-pong instances if they exist
      // if (cleanup) {
      //   cleanup();
      // }
    };
  }, [update, pause, sceneStatus, setStatus, currentFrameRef]);

  return { update, pause };
};
