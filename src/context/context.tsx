import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
  FC,
} from "react";
import { SceneActions, SceneState } from "./scene.context.types";
import { PROCESS_STATUS } from "../consts/consts";

export const INITIAL_SCENE_STATE: SceneState = {
  isLoading: false,
  status: PROCESS_STATUS.FORMATTING_THREE,
  initializedScene: null,
};

type SceneContextType = {
  state: SceneState;
  dispatch: Dispatch<SceneActions>;
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
  return (
    <SceneContext.Provider value={{ state, dispatch }}>
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
