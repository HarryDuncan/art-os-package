import { useMemo } from "react";
import {
  InteractiveScene,
  InteractiveSceneFunctions,
} from "../components/interactive-scene/InteractiveScene";
import { updateUTime } from "../animation/updateUTime";

export const useSceneFunctions = (
  sceneFunctions: InteractiveSceneFunctions | undefined
) =>
  useMemo(() => {
    const defaultSceneFunctions = {
      onTimeUpdate: (scene: InteractiveScene) => {
        updateUTime(scene);
      },
    };
    if (sceneFunctions) {
      return { ...defaultSceneFunctions, ...sceneFunctions };
    }
    return defaultSceneFunctions;
  }, []);
