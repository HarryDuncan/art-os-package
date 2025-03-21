import { getWindowScreenType } from "./screen-type/getWindowScreenType";
export const windowStateReducer = (state, action) => {
    switch (action.type) {
        case "SET_WINDOW_SIZE": {
            const screenType = getWindowScreenType(action.payload.width);
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
