import { InteractiveScene, InteractiveSceneFunctions } from "../components/interactive-scene/InteractiveScene";
export declare const useSceneFunctions: (sceneFunctions: InteractiveSceneFunctions | undefined) => {
    onTimeUpdate: (scene: InteractiveScene) => void;
};
