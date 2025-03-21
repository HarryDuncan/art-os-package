"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowStateProvider = exports.useWindowState = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const windowStateReducer_1 = require("./windowStateReducer");
const windowState_consts_1 = require("./windowState.consts");
const WindowStateContext = (0, react_1.createContext)(undefined);
const useWindowState = () => {
    const context = (0, react_1.useContext)(WindowStateContext);
    if (!context) {
        throw new Error("useWindowState must be used within a WindowStateProvider");
    }
    return context;
};
exports.useWindowState = useWindowState;
const WindowStateProvider = ({ children }) => {
    const [state, dispatch] = (0, react_1.useReducer)(windowStateReducer_1.windowStateReducer, {
        windowSize: { width: 0, height: 0 },
        screenType: windowState_consts_1.SCREEN_TYPE.DESKTOP,
        devicePixelRatio: 1,
    });
    (0, react_1.useEffect)(() => {
        const handleResize = () => {
            const windowSize = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
            dispatch({ type: "SET_WINDOW_SIZE", payload: windowSize });
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return ((0, jsx_runtime_1.jsx)(WindowStateContext.Provider, Object.assign({ value: { state, dispatch } }, { children: children })));
};
exports.WindowStateProvider = WindowStateProvider;
