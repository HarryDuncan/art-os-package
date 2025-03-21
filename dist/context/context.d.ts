import { ReactNode } from "react";
import { SceneActions, SceneState } from "./scene.context.types";
export declare const INITIAL_SCENE_STATE: SceneState;
type SceneContextType = {
    state: SceneState;
    dispatch: React.Dispatch<SceneActions>;
};
export declare const SceneContext: import("react").Context<SceneContextType>;
declare const SceneProvider: React.FC<{
    children: ReactNode;
}>;
declare const useSceneContext: () => SceneContextType;
export { SceneProvider, useSceneContext };
