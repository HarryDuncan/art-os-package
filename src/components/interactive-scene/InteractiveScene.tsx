/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  EventConfig,
  InteractionConfig,
} from "../../interaction/interaction.types";
import { Clock, Scene, Raycaster, Vector2, Camera } from "three";
import { AnimationManager } from "../../animation/animation-manager/AnimationManager";
import { AnimationConfig } from "../../types/animation.types";
import { ENGINE_EVENTS } from "../../engine/engine.consts";
import { SceneProperties } from "../../types/config.types";
import { SceneLight } from "../../config/lights/lights.types";
import { OrbitControl } from "../../types";
import { FUNCTION_MAP } from "../../interaction/functions/functionMap";
import { KEY_POINT_EXTRACTORS } from "../../interaction/key-point-extraction/keyPointExtraction";
import { getSceneConversionData } from "./getSceneConversionData";
export type InteractiveSceneFunctions = {
  onTimeUpdate?: (scene: InteractiveScene) => void;
  onTriggeredUpdate?: (scene: InteractiveScene) => void;
};

export class InteractiveScene extends Scene {
  clock: Clock;

  sceneFunctions: InteractiveSceneFunctions;

  animationManager: AnimationManager;

  orbitControls: OrbitControl | null;

  guid: string;

  eventsSet: boolean;

  sceneProperties: SceneProperties;
  interactionConfig: InteractionConfig[];
  lights: SceneLight[];

  constructor(
    sceneFunctions: InteractiveSceneFunctions,
    eventConfig: EventConfig[],
    animationConfig: AnimationConfig[],
    interactionConfig: InteractionConfig[],
    sceneProperties: SceneProperties,
    lights: SceneLight[],
    camera: Camera
  ) {
    super();
    this.status = "idle";
    this.guid = "";
    this.sceneFunctions = sceneFunctions;
    this.clock = new Clock();
    this.bindExecutionFunctions();
    this.orbitControls = null;
    this.animationManager = new AnimationManager(animationConfig);
    this.eventsSet = false;
    this.sceneProperties = sceneProperties;
    this.interactionConfig = interactionConfig;
    this.lights = lights;
    this.camera = camera;
    this.rendererHeight = 0;
    this.rendererWidth = 0;
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

  private eventListeners: { [key: string]: (e: Event) => void } = {};

  addInteractionEvents(interactionConfigs: InteractionConfig[]) {
    const sceneConversionData = getSceneConversionData(this);
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    interactionConfigs.forEach((interactionConfig) => {
      const eventFunction = FUNCTION_MAP[interactionConfig.functionType];
      const keyPointExtractor =
        KEY_POINT_EXTRACTORS[interactionConfig.eventKey];

      if (!eventFunction) {
        console.warn(
          `Event function ${
            interactionConfig.functionType
          } not found for interaction config ${
            interactionConfig.name ?? interactionConfig.id
          }`
        );
      } else {
        const eventHandler = (e: Event) => {
          // Convert mouse coordinates to normalized device coordinates (-1 to +1)
          mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

          // Update the raycaster with the camera and mouse position
          raycaster.setFromCamera(mouse, this.camera);
          console.log(raycaster);
          console.log(mouse);
          // Get intersections with objects in the scene
          const intersects = raycaster.intersectObjects(this.children, true);
          console.log(intersects);
          const data = keyPointExtractor(e);
          // Add intersection data to the event data
          const eventData = {
            ...data,
            intersects,
            mousePosition: mouse.clone(),
          };

          eventFunction(this as InteractiveScene, eventData, interactionConfig);
        };

        this.eventListeners[interactionConfig.eventKey] = eventHandler;
        document.addEventListener(interactionConfig.eventKey, eventHandler);
      }
    });
  }

  removeInteractionEvents() {
    Object.entries(this.eventListeners).forEach(([eventKey, handler]) => {
      document.removeEventListener(eventKey, handler);
    });
    this.eventListeners = {};
  }

  dispose() {
    this.removeInteractionEvents();
    super.dispose();
  }

  setStatus(status: "idle" | "active") {
    this.status = status;
    if (status === "active") {
      this.addInteractionEvents(this.interactionConfig);
    } else {
      this.removeInteractionEvents();
    }
  }

  addAnimations(animations: AnimationConfig[]) {
    this.animationManager.initializeAnimations(animations);
  }

  setRendererDimensions(rendererHeight: number, rendererWidth: number) {
    this.rendererHeight = rendererHeight;
    this.rendererWidth = rendererWidth;
  }
}
