/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, useRef } from "react";
import { useInitializeNode } from "../use-initialize-node/useInitializeNode";
import { useWebGLRenderer } from "./renderer/use-webgl-renderer/useWebGLRenderer";
import { useOrbitControls } from "./use-orbit-controls/useOrbitControls";
import { ThreeJsParams } from "../../config/config.types";
import { useProcessStatus } from "../useProcessStatus";
import { PROCESS_STATUS } from "../../consts/consts";
import { useSceneContext } from "../../context/context";

export const useThreeJs = (threeJsParams: ThreeJsParams) => {
  const { status, setStatus } = useProcessStatus();
  const { camera } = useSceneContext();
  const { controls } = threeJsParams;
  const container = useRef<HTMLDivElement | null>(null);
  const currentFrameRef = useRef<number>(0);
  const renderer = useWebGLRenderer(threeJsParams.renderer);
  // const cssRenderer = useCssRenderer(threeJsParams.renderer);
  useInitializeNode(container, renderer);
  const orbitControls = useOrbitControls(camera, renderer, controls);

  useEffect(() => {
    if (
      status === PROCESS_STATUS.FORMATTING_THREE &&
      renderer &&
      camera &&
      orbitControls &&
      container.current
    ) {
      renderer.setDomElement(container.current);
      setStatus(PROCESS_STATUS.INITIALIZING_SCENE);
    }
  }, [status, renderer, camera, orbitControls, setStatus]);

  return {
    container,
    renderer,
    camera,
    currentFrameRef,
    orbitControls,
  };
};
