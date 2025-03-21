"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowStateReducer = void 0;
const getWindowScreenType_1 = require("./screen-type/getWindowScreenType");
const windowStateReducer = (state, action) => {
    switch (action.type) {
        case "SET_WINDOW_SIZE": {
            const screenType = (0, getWindowScreenType_1.getWindowScreenType)(action.payload.width);
            return Object.assign(Object.assign({}, state), { windowSize: action.payload, screenType });
        }
        case "RESET_WINDOW_SIZE":
            return Object.assign(Object.assign({}, state), { windowSize: { width: 0, height: 0 } });
        case "SET_PIXEL_RATIO":
            return Object.assign(Object.assign({}, state), { devicePixelRatio: action.payload });
        default:
            return state;
    }
};
exports.windowStateReducer = windowStateReducer;
