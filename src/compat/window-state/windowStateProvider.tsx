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

function resolveWindowSize(
  overrideWidth?: number,
  overrideHeight?: number,
): WindowSize {
  return {
    width: overrideWidth ?? window.innerWidth,
    height: overrideHeight ?? window.innerHeight,
  };
}

export const useWindowState = (): WindowStateContextProps => {
  const context = useContext(WindowStateContext);
  if (!context) {
    throw new Error("useWindowState must be used within a WindowStateProvider");
  }
  return context;
};

type WindowStateProviderProps = {
  children: ReactNode;
  windowWidth?: number;
  windowHeight?: number;
};

export const WindowStateProvider = ({
  children,
  windowWidth,
  windowHeight,
}: WindowStateProviderProps) => {
  const [state, dispatch] = useReducer(windowStateReducer, INITIAL_STATE);

  useEffect(() => {
    dispatch({
      type: "SET_WINDOW_SIZE",
      payload: resolveWindowSize(windowWidth, windowHeight),
    });
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    const hasFixedWidth = windowWidth !== undefined;
    const hasFixedHeight = windowHeight !== undefined;
    if (hasFixedWidth && hasFixedHeight) {
      return;
    }

    const handleResize = () => {
      dispatch({
        type: "SET_WINDOW_SIZE",
        payload: {
          width: windowWidth ?? window.innerWidth,
          height: windowHeight ?? window.innerHeight,
        },
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth, windowHeight]);

  return (
    <WindowStateContext.Provider value={{ state, dispatch }}>
      {children}
    </WindowStateContext.Provider>
  );
};
