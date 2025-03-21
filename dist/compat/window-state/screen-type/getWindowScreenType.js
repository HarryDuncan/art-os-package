import { SCREEN_BREAKPOINTS, SCREEN_TYPE } from "../windowState.consts";
export const getWindowScreenType = (width) => {
    if (width >= SCREEN_BREAKPOINTS.wideScreen) {
        return SCREEN_TYPE.WIDE_SCREEN;
    }
    if (width >= SCREEN_BREAKPOINTS.desktop) {
        return SCREEN_TYPE.DESKTOP;
    }
    if (width >= SCREEN_BREAKPOINTS.tablet) {
        return SCREEN_TYPE.TABLET;
    }
    return SCREEN_TYPE.MOBILE;
};
