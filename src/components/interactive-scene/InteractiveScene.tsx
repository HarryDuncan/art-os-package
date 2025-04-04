import {
  EventConfig,
  InteractionConfig,
  InteractionEvent,
} from "../../interaction/interaction.types";
import { Clock, Scene } from "three";
import { AnimationManager } from "../../animation/animation-manager/AnimationManager";
import { AnimationConfig } from "../../animation/animation.types";
import { ENGINE_EVENTS } from "../../engine/engine.consts";
import { SceneProperties } from "../../config/config.types";
import { SceneLight } from "../../config/lights/lights.types";
import { OrbitControl } from "../../types";

export type InteractiveSceneFunctions = {
  onTimeUpdate?: (scene: InteractiveScene) => void;
  onTriggeredUpdate?: (scene: InteractiveScene) => void;
};

export type SceneInteraction = InteractionConfig & SceneInteractionEvent;
type SceneInteractionEvent = {
  onEvent: (interactive: InteractiveScene, details: unknown) => void;
};

export class InteractiveScene extends Scene {
  clock: Clock;

  sceneFunctions: InteractiveSceneFunctions;

  animationManager: AnimationManager;

  orbitControls: OrbitControl | null;

  guid: string;

  eventsSet: boolean;

  sceneProperties: SceneProperties;
  interactionEvents: EventConfig[];
  lights: SceneLight[];

  constructor(
    sceneFunctions: InteractiveSceneFunctions,
    eventConfig: EventConfig[],
    animationConfig: AnimationConfig[],
    interactionEvents: SceneInteraction[],
    sceneProperties: SceneProperties,
    lights: SceneLight[]
  ) {
    super();
    this.guid = "";
    this.sceneFunctions = sceneFunctions;
    this.clock = new Clock();
    this.bindExecutionFunctions();
    this.addEvents(eventConfig);
    this.addInteractionEvents(interactionEvents);
    this.orbitControls = null;
    this.animationManager = new AnimationManager(animationConfig);
    this.eventsSet = false;
    this.sceneProperties = sceneProperties;
    this.interactionEvents = interactionEvents.map(({ eventKey, onEvent }) => ({
      eventKey,
      onEvent,
      eventFunction: onEvent,
    }));
    this.lights = lights;
  }

  bindExecutionFunctions() {
    const { onTimeUpdate, onTriggeredUpdate } = this.sceneFunctions;
    if (onTimeUpdate) {
      document.addEventListener(ENGINE_EVENTS.UPDATE_SCENE, () =>
        onTimeUpdate(this)
      );
    }
    if (onTriggeredUpdate) {
      document.addEventListener(ENGINE_EVENTS.TRIGGERED, () =>
        onTriggeredUpdate(this)
      );
    }
    // @ts-ignore
    document.addEventListener(ENGINE_EVENTS.MESH_ADDED, ({ detail }) => {
      // @ts-ignore
      this.add(detail);
    });
  }

  addInteractionEvents(interactionEvents: SceneInteraction[]) {
    interactionEvents.forEach(({ eventKey, onEvent }) => {
      document.addEventListener(eventKey, (e) => {
        const { detail } = e as InteractionEvent;
        onEvent(this as InteractiveScene, detail);
      });
    });
  }

  addEvents(eventConfig: EventConfig[]) {
    if (!this.eventsSet) {
      eventConfig.forEach(({ eventKey, eventFunction }) => {
        switch (eventKey) {
          case "scroll":
            this.addOnScrollListener(eventFunction);
            break;
          default:
            window.addEventListener(eventKey, (e) => {
              eventFunction(this, e);
            });
        }
      });
    }
  }

  addOnScrollListener(eventFunction: (scene: Scene, event: Event) => void) {
    window.addEventListener("scroll", (e) => {
      const { scrollY } = window;
      const event = { ...e, scrollY };
      eventFunction(this, event);
    });
  }

  addAnimations(animations: AnimationConfig[]) {
    this.animationManager.initializeAnimations(animations);
  }
}
