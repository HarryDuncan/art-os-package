import { Scene } from "three";
import { EVENT_BIND_TYPES } from "./consts";
export interface EventConfig {
    eventKey: string;
    eventFunction: (scene: Scene, event: Event) => void;
    sceneIdentifer?: string;
}
export type BindType = typeof EVENT_BIND_TYPES;
export type BindTypeKey = keyof BindType;
