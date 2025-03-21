import { InteractiveScene } from "../components/interactive-scene/InteractiveScene";
export type SceneState = {
    initializedScene: null | InteractiveScene;
};
export type SceneActions = {
    type: "INITIALIZE_SCENE";
    payload: {
        initializedScene: InteractiveScene;
    };
};
