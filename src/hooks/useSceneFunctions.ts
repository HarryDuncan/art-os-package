import { useMemo } from "react";
import {
  InteractiveScene,
  InteractiveSceneFunctions,
} from "../components/interactive-scene/InteractiveScene";
import { updateUTime } from "../animation/updateUTime";
import { updateCameraTimelines } from "../parameter-control/timeline/cameraTimelineApi";

export const useSceneFunctions = (
  sceneFunctions: InteractiveSceneFunctions | undefined
) =>
  useMemo(() => {
    const defaultSceneFunctions = {
      onTimeUpdate: (scene: InteractiveScene) => {
        updateUTime(scene);
        updateCameraTimelines(scene);
      },
    };
    if (sceneFunctions) {
      return { ...defaultSceneFunctions, ...sceneFunctions };
    }
    return defaultSceneFunctions;
  }, []);
