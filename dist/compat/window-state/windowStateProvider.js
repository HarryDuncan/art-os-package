import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useReducer, } from "react";
import { windowStateReducer } from "./windowStateReducer";
import { SCREEN_TYPE } from "./windowState.consts";
const WindowStateContext = createContext(undefined);
export const useWindowState = () => {
    const context = useContext(WindowStateContext);
    if (!context) {
        throw new Error("useWindowState must be used within a WindowStateProvider");
    }
    return context;
};
export const WindowStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(windowStateReducer, {
        windowSize: { width: 0, height: 0 },
        screenType: SCREEN_TYPE.DESKTOP,
        devicePixelRatio: 1,
    });
    useEffect(() => {
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
    return (_jsx(WindowStateContext.Provider, Object.assign({ value: { state, dispatch } }, { children: children })));
};
