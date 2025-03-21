"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWindowScreenType = void 0;
const windowState_consts_1 = require("../windowState.consts");
const getWindowScreenType = (width) => {
    if (width >= windowState_consts_1.SCREEN_BREAKPOINTS.wideScreen) {
        return windowState_consts_1.SCREEN_TYPE.WIDE_SCREEN;
    }
    if (width >= windowState_consts_1.SCREEN_BREAKPOINTS.desktop) {
        return windowState_consts_1.SCREEN_TYPE.DESKTOP;
    }
    if (width >= windowState_consts_1.SCREEN_BREAKPOINTS.tablet) {
        return windowState_consts_1.SCREEN_TYPE.TABLET;
    }
    return windowState_consts_1.SCREEN_TYPE.MOBILE;
};
exports.getWindowScreenType = getWindowScreenType;
