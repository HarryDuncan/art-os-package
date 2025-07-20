import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
  FC,
  useState,
} from "react";
import { SceneActions, SceneState } from "./scene.context.types";
import { PROCESS_STATUS } from "../consts/consts";
import { Camera } from "three";
import { InteractionConfig } from "../interaction/types";

export const INITIAL_SCENE_STATE: SceneState = {
  isLoading: false,
  status: PROCESS_STATUS.FORMATTING_THREE,
  initializedScene: null,
};

type SceneContextType = {
  state: SceneState;
  dispatch: Dispatch<SceneActions>;
  camera: Camera | null;
  setCamera: (camera: Camera | null) => void;
  rendererHeight: number;
  setRendererHeight: (rendererHeight: number) => void;
  rendererWidth: number;
  setRendererWidth: (rendererWidth: number) => void;
  interactionConfigs: InteractionConfig[];
  setInteractionConfigs: (interactionConfigs: InteractionConfig[]) => void;
};
export const SceneContext = createContext<SceneContextType | undefined>(
  undefined
);

const reducer = (state: SceneState, action: SceneActions) => {
  switch (action.type) {
    case "UPDATE_STATUS":
      return {
        ...state,
        status: action.payload.status,
      };
    case "IS_LOADING":
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case "INITIALIZE_SCENE":
      return {
        ...state,
        status: PROCESS_STATUS.INITIALIZING_POST_PROCESSOR,
        initializedScene: action.payload.initializedScene,
      };
    default:
      return state;
  }
};

const SceneProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_SCENE_STATE);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [interactionConfigs, setInteractionConfigs] = useState<
    InteractionConfig[]
  >([]);
  const [rendererHeight, setRendererHeight] = useState<number>(0);
  const [rendererWidth, setRendererWidth] = useState<number>(0);

  return (
    <SceneContext.Provider
      value={{
        state,
        dispatch,
        camera,
        setCamera,
        rendererHeight,
        setRendererHeight,
        rendererWidth,
        setRendererWidth,
        interactionConfigs,
        setInteractionConfigs,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
};

const useSceneContext = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error("useSceneContext must be used within a Scene Provider");
  }

  return context;
};

export { SceneProvider, useSceneContext };
