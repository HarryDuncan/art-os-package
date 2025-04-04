import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { windowStateReducer } from "./windowStateReducer";
import { ScreenType, WindowSize, WindowStateContextProps } from "./types";
import { SCREEN_TYPE } from "./windowState.consts";

const INITIAL_STATE = {
  windowSize: { width: 0, height: 0 },
  screenType: SCREEN_TYPE.DESKTOP as ScreenType,
  devicePixelRatio: 1,
};

const WindowStateContext = createContext<WindowStateContextProps | undefined>(
  undefined
);

export const useWindowState = (): WindowStateContextProps => {
  const context = useContext(WindowStateContext);
  if (!context) {
    throw new Error("useWindowState must be used within a WindowStateProvider");
  }
  return context;
};

export const WindowStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(windowStateReducer, INITIAL_STATE);

  useEffect(() => {
    const handleResize = () => {
      const windowSize: WindowSize = {
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

  return (
    <WindowStateContext.Provider value={{ state, dispatch }}>
      {children}
    </WindowStateContext.Provider>
  );
};
