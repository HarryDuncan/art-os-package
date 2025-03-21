/// <reference types="react" />
import { SCREEN_TYPE } from "./windowState.consts";
export type ScreenType = keyof typeof SCREEN_TYPE;
export interface WindowStateContextProps {
    state: WindowState;
    dispatch: React.Dispatch<WindowStateAction>;
}
export interface WindowSize {
    width: number;
    height: number;
}
export interface WindowState {
    windowSize: WindowSize;
    devicePixelRatio: number;
    screenType: ScreenType;
}
export type WindowStateAction = {
    type: "SET_WINDOW_SIZE";
    payload: WindowSize;
} | {
    type: "RESET_WINDOW_SIZE";
} | {
    type: "SET_PIXEL_RATIO";
    payload: number;
};
