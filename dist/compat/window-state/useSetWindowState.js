"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSetWindowState = void 0;
const react_1 = require("react");
const windowStateProvider_1 = require("./windowStateProvider");
const useSetWindowState = () => {
    const { dispatch } = (0, windowStateProvider_1.useWindowState)();
    const handleWindowResize = (0, react_1.useCallback)(() => {
        dispatch({
            type: "SET_WINDOW_SIZE",
            payload: { width: window.innerWidth, height: window.innerHeight },
        });
    }, [dispatch]);
    (0, react_1.useEffect)(() => {
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [handleWindowResize]);
};
exports.useSetWindowState = useSetWindowState;
