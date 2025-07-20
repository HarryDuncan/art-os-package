import { useEffect, useRef } from "react";
import { useInitializeNode } from "../use-initialize-node/useInitializeNode";
import { useWebGLRenderer } from "./renderer/use-webgl-renderer/useWebGLRenderer";
import { useOrbitControls } from "./use-orbit-controls/useOrbitControls";
import { ControlConfig } from "../../config/config.types";
import { useProcessStatus } from "../useProcessStatus";
import { PROCESS_STATUS } from "../../consts/consts";
import { useSceneContext } from "../../context/context";
import { Camera } from "three";

export const useThreeJs = (controlConfig: Partial<ControlConfig>) => {
  const { status, setStatus } = useProcessStatus();
  const { camera } = useSceneContext();
  const container = useRef<HTMLDivElement | null>(null);
  const currentFrameRef = useRef<number>(0);
  const renderer = useWebGLRenderer();
  // const cssRenderer = useCssRenderer(threeJsParams.renderer);
  useInitializeNode(container, renderer);
  const orbitControls = useOrbitControls(
    camera as Camera,
    renderer,
    controlConfig
  );

  useEffect(() => {
    if (
      status === PROCESS_STATUS.FORMATTING_THREE &&
      renderer &&
      camera &&
      orbitControls &&
      container.current
    ) {
      // @ts-expect-error - setDomElement is a method of WebGLRenderer
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
