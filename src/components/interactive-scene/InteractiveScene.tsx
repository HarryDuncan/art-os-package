import {
  EventConfig,
  InteractionConfig,
  InteractionEvent,
} from "interaction/interactions.types";
import { Clock, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { AnimationManager } from "animation/animation-manager/AnimationManager";
import { AnimationConfig } from "animation/animation.types";
import { ENGINE_EVENTS } from "engine/engine.consts";

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

  orbitControls: OrbitControls | null;

  guid: string;

  eventsSet: boolean;

  constructor(
    sceneFunctions: InteractiveSceneFunctions,
    eventConfig: EventConfig[],
    animationConfig: AnimationConfig[],
    interactionEvents: SceneInteraction[]
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
  }

  bindExecutionFunctions() {
    const { onTimeUpdate, onTriggeredUpdate } = this.sceneFunctions;
    if (onTimeUpdate) {
      document.addEventListener(ENGINE_EVENTS.UPDATE_SCENE, () =>
        onTimeUpdate(this)
      );
    }
    if (onTriggeredUpdate) {
      document.addEventListener(ENGINE_EVENTS.TIGGERED_UPDATE, () =>
        onTriggeredUpdate(this)
      );
    }
    // @ts-ignore
    document.addEventListener(ENGINE_EVENTS.MESH_ADDED, ({ detail }) => {
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

  addOrbitControls(orbitControls: OrbitControls | null) {
    if (orbitControls) {
      this.orbitControls = orbitControls;
    }
  }
}
