import { InteractionConfig } from "../../interaction/types";
import { Clock, Scene, Camera } from "three";
import { AnimationManager } from "../../animation/animation-manager/AnimationManager";
import { AnimationConfig } from "../../animation/animation.types";
import { THREAD_EVENTS } from "../../thread/thread.consts";
import { SceneProperties } from "../../config/config.types";
import { OrbitControl } from "../../types";
import { FUNCTION_MAP } from "../../interaction/functions/functionMap";
// import { KEY_POINT_EXTRACTORS } from "../../interaction/key-point-extraction/keyPointExtraction";

/*
  TODO - fix the interaction event initialization with the v2 interaction configs
*/
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

  interactionConfigs: InteractionConfig[];

  sceneStatus: string;

  camera: Camera;

  rendererHeight: number;

  rendererWidth: number;

  constructor(
    sceneFunctions: InteractiveSceneFunctions,
    animationConfig: AnimationConfig[],
    interactionConfigs: InteractionConfig[],
    sceneProperties: SceneProperties,
    camera: Camera
  ) {
    super();
    this.sceneStatus = "idle";
    this.guid = "";
    this.sceneFunctions = sceneFunctions;
    this.clock = new Clock();
    this.bindExecutionFunctions();
    this.orbitControls = null;
    this.animationManager = new AnimationManager(animationConfig);
    this.eventsSet = false;
    this.sceneProperties = sceneProperties;
    this.interactionConfigs = interactionConfigs;
    this.camera = camera;
    this.rendererHeight = 0;
    this.rendererWidth = 0;
  }

  bindExecutionFunctions() {
    const { onTimeUpdate, onTriggeredUpdate } = this.sceneFunctions;
    if (onTimeUpdate) {
      document.addEventListener(THREAD_EVENTS.UPDATE_SCENE, () =>
        onTimeUpdate(this)
      );
    }
    if (onTriggeredUpdate) {
      document.addEventListener(THREAD_EVENTS.TRIGGERED, () =>
        onTriggeredUpdate(this)
      );
    }

    document.addEventListener(THREAD_EVENTS.MESH_ADDED, (event: Event) => {
      const detail = (event as CustomEvent).detail;
      this.add(detail);
    });
  }

  private eventListeners: { [key: string]: (e: Event) => void } = {};

  addInteractionEvents(interactionConfigs: InteractionConfig[]) {
    interactionConfigs.forEach((interactionConfig) => {
      const { output } = interactionConfig;
      const eventFunction = FUNCTION_MAP[output?.functionType];
      // const keyPointExtractor =
      //   KEY_POINT_EXTRACTORS[interactionConfig.modelConfig.eventKey];

      // if (!eventFunction) {
      //   console.warn(
      //     `Event function ${
      //       interactionConfig.functionType
      //     } not found for interaction config ${
      //       interactionConfig.name ?? interactionConfig.id
      //     }`
      //   );
      // } else {
      //   const params = {
      //     camera: this.camera,
      //     rendererHeight: this.rendererHeight,
      //     rendererWidth: this.rendererWidth,
      //     zTarget: 0,
      //   };
      //   const formattedInteractionConfig = {
      //     materialIds: interactionConfig.materialIds,
      //     uniformKeys: Object.entries(interactionConfig.outputMapping).flatMap(
      //       ([key, mapping]) => `u_${key}_${mapping.itemId}`
      //     ),
      //     keyPointId: interactionConfig.outputConfig[0].rawDataPoints[0],
      //   };

      //   const eventHandler = (e: Event) => {
      //     const eventData = keyPointExtractor(e, params);
      //     eventFunction(
      //       this as InteractiveScene,
      //       eventData,
      //       formattedInteractionConfig
      //     );
      //   };

      //   this.eventListeners[interactionConfig.modelConfig.eventKey] =
      //     eventHandler;
      //   document.addEventListener(
      //     interactionConfig.modelConfig.eventKey,
      //     eventHandler
      //   );
      // }
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
    if (this.orbitControls) {
      this.orbitControls.dispose();
    }
    // Remove all children from the scene
    while (this.children.length > 0) {
      this.remove(this.children[0]);
    }
  }

  setStatus(status: "idle" | "active") {
    this.sceneStatus = status;
    if (status === "active") {
      this.addInteractionEvents(this.interactionConfigs);
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
