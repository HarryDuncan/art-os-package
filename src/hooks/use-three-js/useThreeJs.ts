import { useRef } from "react";
import { useInitializeNode } from "../use-initialize-node/useInitializeNode";
import { useWebGLRenderer } from "./renderer/use-webgl-renderer/useWebGLRenderer";
import { useOrbitControls } from "./use-orbit-controls/useOrbitControls";
import { ControlConfig } from "../../config/config.types";
import { useSceneContext } from "../../context/context";

export const useThreeJs = (controlConfig: Partial<ControlConfig>) => {
  const { camera } = useSceneContext();

  const container = useRef<HTMLDivElement | null>(null);
  const currentFrameRef = useRef<number>(0);
  const renderer = useWebGLRenderer();

  useInitializeNode(container, renderer);
  const orbitControls = useOrbitControls(camera, renderer, controlConfig);

  return {
    container,
    renderer,
    camera,
    currentFrameRef,
    orbitControls,
  };
};
