"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSceneContext = exports.SceneProvider = exports.SceneContext = exports.INITIAL_SCENE_STATE = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.INITIAL_SCENE_STATE = {
    initializedScene: null,
};
exports.SceneContext = (0, react_1.createContext)(undefined);
const reducer = (state, action) => {
    switch (action.type) {
        case "INITIALIZE_SCENE":
            return Object.assign(Object.assign({}, state), { initializedScene: action.payload.initializedScene });
        default:
            return state;
    }
};
const SceneProvider = ({ children }) => {
    const [state, dispatch] = (0, react_1.useReducer)(reducer, exports.INITIAL_SCENE_STATE);
    return ((0, jsx_runtime_1.jsx)(exports.SceneContext.Provider, Object.assign({ value: { state, dispatch } }, { children: children })));
};
exports.SceneProvider = SceneProvider;
const useSceneContext = () => {
    const context = (0, react_1.useContext)(exports.SceneContext);
    if (!context) {
        throw new Error("useSceneContext must be used within a Scene Provider");
    }
    return context;
};
exports.useSceneContext = useSceneContext;
