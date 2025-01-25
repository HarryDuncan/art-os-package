import { createContext, useReducer, useContext, ReactNode } from "react";

import { SceneActions, SceneState } from "./scene.context.types";

export const INITIAL_SCENE_STATE: SceneState = {
  initializedScene: null,
};

type SceneContextType = {
  state: SceneState;
  dispatch: React.Dispatch<SceneActions>;
};
export const SceneContext = createContext<SceneContextType | undefined>(
  undefined
);

const reducer = (state: SceneState, action: SceneActions) => {
  switch (action.type) {
    case "INITIALIZE_SCENE":
      return {
        ...state,
        initializedScene: action.payload.initializedScene,
      };
    default:
      return state;
  }
};

const SceneProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
