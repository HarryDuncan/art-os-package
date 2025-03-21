import { useCallback, useEffect } from "react";
import { useWindowState } from "./windowStateProvider";
export const useSetWindowState = () => {
    const { dispatch } = useWindowState();
    const handleWindowResize = useCallback(() => {
        dispatch({
            type: "SET_WINDOW_SIZE",
            payload: { width: window.innerWidth, height: window.innerHeight },
        });
    }, [dispatch]);
    useEffect(() => {
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [handleWindowResize]);
};
