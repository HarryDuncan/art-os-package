import { EventConfig, InteractionConfig } from "../../interaction/interaction.types";
import { Clock, Scene } from "three";
import { AnimationManager } from "../../animation/animation-manager/AnimationManager";
import { AnimationConfig } from "../../animation/animation.types";
import { Camera } from "three";
import { SceneProperties } from "../../config/config.types";
import { SceneLight } from "../../config/lights/lights.types";
export type InteractiveSceneFunctions = {
    onTimeUpdate?: (scene: InteractiveScene) => void;
    onTriggeredUpdate?: (scene: InteractiveScene) => void;
};
export type SceneInteraction = InteractionConfig & SceneInteractionEvent;
type SceneInteractionEvent = {
    onEvent: (interactive: InteractiveScene, details: unknown) => void;
};
export declare class InteractiveScene extends Scene {
    clock: Clock;
    sceneFunctions: InteractiveSceneFunctions;
    animationManager: AnimationManager;
    orbitControls: any;
    guid: string;
    eventsSet: boolean;
    sceneProperties: SceneProperties;
    interactionEvents: EventConfig[];
    lights: SceneLight[];
    constructor(sceneFunctions: InteractiveSceneFunctions, eventConfig: EventConfig[], animationConfig: AnimationConfig[], interactionEvents: SceneInteraction[], sceneProperties: SceneProperties, lights: SceneLight[]);
    bindExecutionFunctions(): void;
    addInteractionEvents(interactionEvents: SceneInteraction[]): void;
    addEvents(eventConfig: EventConfig[]): void;
    addOnScrollListener(eventFunction: (scene: Scene, event: Event) => void): void;
    addAnimations(animations: AnimationConfig[]): void;
    initOrbitControls(camera: Camera, renderer: any): Promise<void>;
}
export {};
