import { MutableRefObject, useCallback, useEffect } from "react";
import { Camera, Object3D, WebGLRenderer } from "three";
import { sceneUpdateEvent } from "../../engine/engineEvents";
import { useSceneContext } from "../../context/context";
import { PROCESS_STATUS } from "../../consts/consts";

export const useThread = (
  currentFrameRef: MutableRefObject<number>,
  camera: Camera,
  renderer: WebGLRenderer | undefined
) => {
  const {
    dispatch,
    state: { initializedScene },
  } = useSceneContext();

  const update = useCallback(async () => {
    if (!renderer) {
      console.warn("renderer not defined");
      return;
    }
    sceneUpdateEvent();
    if (initializedScene?.orbitControls) {
      initializedScene.orbitControls.update();
    }
    renderer.render(initializedScene as Object3D, camera);
    currentFrameRef.current = requestAnimationFrame(update);
  }, [currentFrameRef, renderer, initializedScene, camera]);

  const pause = useCallback(() => {
    cancelAnimationFrame(currentFrameRef.current);
  }, [currentFrameRef]);

  useEffect(() => {
    dispatch({
      type: "UPDATE_STATUS",
      payload: { status: PROCESS_STATUS.RUNNING },
    });
    currentFrameRef.current = requestAnimationFrame(update);
    return () => {
      if (currentFrameRef.current) {
        cancelAnimationFrame(currentFrameRef.current);
      }
    };
  }, [currentFrameRef, update, dispatch]);

  return { update, pause };
};
