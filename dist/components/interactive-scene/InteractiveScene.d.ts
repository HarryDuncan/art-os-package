import { EventConfig, InteractionConfig } from "../../interaction/interaction.types";
import { Clock, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { AnimationManager } from "../../animation/animation-manager/AnimationManager";
import { AnimationConfig } from "../../animation/animation.types";
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
    orbitControls: OrbitControls | null;
    guid: string;
    eventsSet: boolean;
    constructor(sceneFunctions: InteractiveSceneFunctions, eventConfig: EventConfig[], animationConfig: AnimationConfig[], interactionEvents: SceneInteraction[]);
    bindExecutionFunctions(): void;
    addInteractionEvents(interactionEvents: SceneInteraction[]): void;
    addEvents(eventConfig: EventConfig[]): void;
    addOnScrollListener(eventFunction: (scene: Scene, event: Event) => void): void;
    addAnimations(animations: AnimationConfig[]): void;
    addOrbitControls(orbitControls: OrbitControls | null): void;
}
export {};
