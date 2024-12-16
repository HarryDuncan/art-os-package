import { ScreenType } from "../types";
import { SCREEN_BREAKPOINTS, SCREEN_TYPE } from "../windowState.consts";

export const getWindowScreenType = (width: number): ScreenType => {
  if (width >= SCREEN_BREAKPOINTS.wideScreen) {
    return SCREEN_TYPE.WIDE_SCREEN as ScreenType;
  }
  if (width >= SCREEN_BREAKPOINTS.desktop) {
    return SCREEN_TYPE.DESKTOP as ScreenType;
  }
  if (width >= SCREEN_BREAKPOINTS.tablet) {
    return SCREEN_TYPE.TABLET as ScreenType;
  }
  return SCREEN_TYPE.MOBILE as ScreenType;
};
