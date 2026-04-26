import { Clock, Scene, Camera, Object3D } from "three";
import { THREAD_EVENTS } from "../../thread/thread.consts";
import { PeripheralConfig, SceneProperties } from "../../config/config.types";
import { OrbitControl } from "../../types";
import { disposeObject3D } from "../../utils/cleanup/disposeAssets";
import {
  EVENT_HANDLER_MAP,
  EVENT_KEY_MAP,
  PERIPHERAL_INTERACTION_KEYS,
} from "../../peripheral/consts";
import { setUniforms } from "../../peripheral/helpers/setUniforms";
import { buildMaterialMeshMap } from "../../peripheral/helpers/buildMaterialMeshMap";
import { getUniformsForOutput } from "../../utils/getUniformsForOutput";
import {
  registerPeripheralContext,
  deregisterPeripheralContext,
} from "../../peripheral/onPeripheralTrigger";

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

  peripheralConfigs: PeripheralConfig[];

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
    peripheralConfigs: PeripheralConfig[],
    sceneProperties: SceneProperties,
    camera: Camera,
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
    this.peripheralConfigs = peripheralConfigs;
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
        this.boundEventHandlers.updateScene,
      );
    }
    if (onTriggeredUpdate) {
      this.boundEventHandlers.triggered = () => onTriggeredUpdate(this);
      document.addEventListener(
        THREAD_EVENTS.TRIGGERED,
        this.boundEventHandlers.triggered,
      );
    }

    this.boundEventHandlers.meshAdded = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      this.add(detail);
    };
    document.addEventListener(
      THREAD_EVENTS.MESH_ADDED,
      this.boundEventHandlers.meshAdded,
    );
  }

  removeExecutionFunctions() {
    Object.entries(this.boundEventHandlers).forEach(([key, handler]) => {
      document.removeEventListener(key, handler);
    });
  }

  private eventListeners: { [key: string]: (e: Event) => void } = {};

  initializePeripheralInteractions(peripheralInteractions: PeripheralConfig[]) {
    registerPeripheralContext(this, peripheralInteractions);
    const materialMeshMap = buildMaterialMeshMap(this);

    peripheralInteractions.forEach((peripheralConfig) => {
      const { interactions, outputForMaterials = {} } = peripheralConfig;

      const meshTargets: Record<string, Object3D[]> = {};
      for (const materialId of Object.keys(outputForMaterials)) {
        meshTargets[materialId] = materialMeshMap[materialId] ?? [];
      }

      const formattedOutputForMaterials =
        getUniformsForOutput(outputForMaterials);

      const clickTargets = Object.values(meshTargets).flat();

      const params = {
        camera: this.camera,
        rendererHeight: this.rendererHeight,
        rendererWidth: this.rendererWidth,
        zTarget: 0,
        clickTargets,
      };

      interactions.forEach((interaction) => {
        const interactionHandler = EVENT_HANDLER_MAP[interaction.type];
        const eventKey = EVENT_KEY_MAP[interaction.type];
        if (!eventKey) {
          console.warn(
            `Event key not found for interaction type ${interaction.type}`,
          );
          return;
        }
        if (!interactionHandler) {
          console.warn(
            `Interaction handler not found for interaction type ${interaction.type}`,
          );
          return;
        }
        const eventHandler = (e: Event) => {
          const result = interactionHandler(e as MouseEvent, params);
          setUniforms(meshTargets, formattedOutputForMaterials, result);
        };

        this.eventListeners[eventKey] = eventHandler;
        document.addEventListener(eventKey, eventHandler);
      });
    });
  }
  // addInteractionEvents(interactionConfigs: InteractionConfig[]) {
  //   interactionConfigs.forEach((interactionConfig) => {
  //     const { output } = interactionConfig;
  //     const eventFunction = FUNCTION_MAP[output?.functionType];
  //     // const keyPointExtractor =
  //     //   KEY_POINT_EXTRACTORS[interactionConfig.modelConfig.eventKey];

  //     // if (!eventFunction) {
  //     //   console.warn(
  //     //     `Event function ${
  //     //       interactionConfig.functionType
  //     //     } not found for interaction config ${
  //     //       interactionConfig.name ?? interactionConfig.id
  //     //     }`
  //     //   );
  //     // } else {
  //     //   const params = {
  //     //     camera: this.camera,
  //     //     rendererHeight: this.rendererHeight,
  //     //     rendererWidth: this.rendererWidth,
  //     //     zTarget: 0,
  //     //   };
  //     //   const formattedInteractionConfig = {
  //     //     materialIds: interactionConfig.materialIds,
  //     //     uniformKeys: Object.entries(interactionConfig.outputMapping).flatMap(
  //     //       ([key, mapping]) => `u_${key}_${mapping.itemId}`
  //     //     ),
  //     //     keyPointId: interactionConfig.outputConfig[0].rawDataPoints[0],
  //     //   };

  //     //   const eventHandler = (e: Event) => {
  //     //     const eventData = keyPointExtractor(e, params);
  //     //     eventFunction(
  //     //       this as InteractiveScene,
  //     //       eventData,
  //     //       formattedInteractionConfig
  //     //     );
  //     //   };

  //     //   this.eventListeners[interactionConfig.modelConfig.eventKey] =
  //     //     eventHandler;
  //     //   document.addEventListener(
  //     //     interactionConfig.modelConfig.eventKey,
  //     //     eventHandler
  //     //   );
  //     // }
  //   });
  // }

  removePeripheralInteractions() {
    Object.entries(this.eventListeners).forEach(([eventKey, handler]) => {
      document.removeEventListener(eventKey, handler);
    });
    this.eventListeners = {};
    deregisterPeripheralContext();
  }

  dispose() {
    this.removePeripheralInteractions();

    // Remove event listeners added in bindExecutionFunctions
    if (this.boundEventHandlers.updateScene) {
      document.removeEventListener(
        THREAD_EVENTS.UPDATE_SCENE,
        this.boundEventHandlers.updateScene,
      );
    }
    if (this.boundEventHandlers.triggered) {
      document.removeEventListener(
        THREAD_EVENTS.TRIGGERED,
        this.boundEventHandlers.triggered,
      );
    }
    if (this.boundEventHandlers.meshAdded) {
      document.removeEventListener(
        THREAD_EVENTS.MESH_ADDED,
        this.boundEventHandlers.meshAdded,
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
      this.initializePeripheralInteractions(this.peripheralConfigs);
    } else {
      this.removePeripheralInteractions();
    }
  }

  setRendererDimensions(rendererHeight: number, rendererWidth: number) {
    this.rendererHeight = rendererHeight;
    this.rendererWidth = rendererWidth;
  }
}
