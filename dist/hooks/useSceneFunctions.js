import { useMemo } from "react";
import { startSceneElementAnimations } from "../animation/animation-manager/startSceneElementAnimations";
export const useSceneFunctions = (sceneFunctions) => useMemo(() => {
    const defaultSceneFunctions = {
        onTimeUpdate: (scene) => {
            startSceneElementAnimations(scene);
        },
    };
    if (sceneFunctions) {
        return Object.assign(Object.assign({}, defaultSceneFunctions), sceneFunctions);
    }
    return defaultSceneFunctions;
}, []);
