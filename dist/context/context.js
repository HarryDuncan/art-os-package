import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useReducer, useContext } from "react";
export const INITIAL_SCENE_STATE = {
    initializedScene: null,
};
export const SceneContext = createContext(undefined);
const reducer = (state, action) => {
    switch (action.type) {
        case "INITIALIZE_SCENE":
            return Object.assign(Object.assign({}, state), { initializedScene: action.payload.initializedScene });
        default:
            return state;
    }
};
const SceneProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_SCENE_STATE);
    return (_jsx(SceneContext.Provider, Object.assign({ value: { state, dispatch } }, { children: children })));
};
const useSceneContext = () => {
    const context = useContext(SceneContext);
    if (!context) {
        throw new Error("useSceneContext must be used within a Scene Provider");
    }
    return context;
};
export { SceneProvider, useSceneContext };
