import { InteractionConfig } from "../../interaction/types";
import { Clock, Scene, Camera } from "three";
import { THREAD_EVENTS } from "../../thread/thread.consts";
import { SceneProperties } from "../../config/config.types";
import { OrbitControl } from "../../types";
import { FUNCTION_MAP } from "../../interaction/functions/functionMap";
import { disposeObject3D } from "../../utils/cleanup/disposeAssets";
// import { KEY_POINT_EXTRACTORS } from "../../interaction/key-point-extraction/keyPointExtraction";

/*
  TODO - fix the interaction event initialization with the v2 interaction configs
*/
export type InteractiveSceneFunctions = {
  onTimeUpdate?: (scene: InteractiveScene) => void;
  onTriggeredUpdate?: (scene: InteractiveScene) => void;
};

export class InteractiveScene extends Scene {
  clock: Clock | null;

  sceneFunctions: InteractiveSceneFunctions;

  orbitControls: OrbitControl | null;

  guid: string;

  eventsSet: boolean;

  sceneProperties: SceneProperties;

  interactionConfigs: InteractionConfig[];

  sceneStatus: string;

  camera: Camera;

  rendererHeight: number;

  rendererWidth: number;

  private boundEventHandlers: {
    updateScene?: () => void;
    triggered?: () => void;
    meshAdded?: (event: Event) => void;
  } = {};

  constructor(
    sceneFunctions: InteractiveSceneFunctions,

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

    this.eventsSet = false;
    this.sceneProperties = sceneProperties;
    this.interactionConfigs = interactionConfigs;
    this.camera = camera;
    this.rendererHeight = 0;
    this.rendererWidth = 0;
  }

  bindExecutionFunctions() {
    const { onTimeUpdate, onTriggeredUpdate } = this.sceneFunctions;

    // Store handlers so we can remove them later
    if (onTimeUpdate) {
      this.boundEventHandlers.updateScene = () => onTimeUpdate(this);
      document.addEventListener(
        THREAD_EVENTS.UPDATE_SCENE,
        this.boundEventHandlers.updateScene
      );
    }
    if (onTriggeredUpdate) {
      this.boundEventHandlers.triggered = () => onTriggeredUpdate(this);
      document.addEventListener(
        THREAD_EVENTS.TRIGGERED,
        this.boundEventHandlers.triggered
      );
    }

    this.boundEventHandlers.meshAdded = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      this.add(detail);
    };
    document.addEventListener(
      THREAD_EVENTS.MESH_ADDED,
      this.boundEventHandlers.meshAdded
    );
  }

  removeExecutionFunctions() {
    Object.entries(this.boundEventHandlers).forEach(([key, handler]) => {
      document.removeEventListener(key, handler);
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

    // Remove event listeners added in bindExecutionFunctions
    if (this.boundEventHandlers.updateScene) {
      document.removeEventListener(
        THREAD_EVENTS.UPDATE_SCENE,
        this.boundEventHandlers.updateScene
      );
    }
    if (this.boundEventHandlers.triggered) {
      document.removeEventListener(
        THREAD_EVENTS.TRIGGERED,
        this.boundEventHandlers.triggered
      );
    }
    if (this.boundEventHandlers.meshAdded) {
      document.removeEventListener(
        THREAD_EVENTS.MESH_ADDED,
        this.boundEventHandlers.meshAdded
      );
    }

    if (this.orbitControls) {
      this.orbitControls.dispose();
    }

    // Dispose of all children (meshes, geometries, materials)
    while (this.children.length > 0) {
      const child = this.children[0];
      disposeObject3D(child);
      this.remove(child);
    }
    this.clock?.stop();
    this.clock = null;
  }

  setStatus(status: "idle" | "active") {
    this.sceneStatus = status;
    if (status === "active") {
      this.addInteractionEvents(this.interactionConfigs);
    } else {
      this.removeInteractionEvents();
    }
  }

  setRendererDimensions(rendererHeight: number, rendererWidth: number) {
    this.rendererHeight = rendererHeight;
    this.rendererWidth = rendererWidth;
  }
}
