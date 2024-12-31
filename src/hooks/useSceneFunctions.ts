import { useMemo } from "react";
import { startSceneElementAnimations } from "../animation/animation-manager/startSceneElementAnimations";
import {
  InteractiveScene,
  InteractiveSceneFunctions,
} from "../components/interactive-scene/InteractiveScene";

export const useSceneFunctions = (
  sceneFunctions: InteractiveSceneFunctions | undefined
) =>
  useMemo(() => {
    const defaultSceneFunctions = {
      onTimeUpdate: (scene: InteractiveScene) => {
        startSceneElementAnimations(scene);
      },
    };
    if (sceneFunctions) {
      return { ...defaultSceneFunctions, ...sceneFunctions };
    }
    return defaultSceneFunctions;
  }, []);
