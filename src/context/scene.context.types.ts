import { InteractiveScene } from "../components/interactive-scene/InteractiveScene";

export type SceneState = {
  initializedScene: null | InteractiveScene;
  isLoading: boolean;
  status: string;
};

export type SceneActions =
  | {
      type: "INITIALIZE_SCENE";
      payload: { initializedScene: InteractiveScene };
    }
  | { type: "UPDATE_STATUS"; payload: { status: string } }
  | {
      type: "IS_LOADING";
      payload: { isLoading: boolean; loadingStatus?: string };
    };
