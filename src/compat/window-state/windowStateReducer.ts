import { getWindowScreenType } from "./screen-type/getWindowScreenType";
import { WindowState, WindowStateAction } from "./types";

export const windowStateReducer = (
  state: WindowState,
  action: WindowStateAction
): WindowState => {
  switch (action.type) {
    case "SET_WINDOW_SIZE": {
      const screenType = getWindowScreenType(action.payload.width);
      return { ...state, windowSize: action.payload, screenType };
    }
    case "RESET_WINDOW_SIZE":
      return { ...state, windowSize: { width: 0, height: 0 } };
    case "SET_PIXEL_RATIO":
      return { ...state, devicePixelRatio: action.payload };
    default:
      return state;
  }
};
