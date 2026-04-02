import { Scene, Object3D } from "three";
import { PeripheralConfig } from "../config/config.types";
import { PeripheralInteraction } from "./types";
import { buildMaterialMeshMap } from "./helpers/buildMaterialMeshMap";
import { setUniforms } from "./helpers/setUniforms";
import { getUniformsForOutput } from "../utils/getUniformsForOutput";

let registeredScene: Scene | null = null;
let registeredConfigs: PeripheralConfig[] = [];

export const registerPeripheralContext = (
  scene: Scene,
  peripheralConfigs: PeripheralConfig[],
) => {
  registeredScene = scene;
  registeredConfigs = peripheralConfigs;
};

export const deregisterPeripheralContext = () => {
  registeredScene = null;
  registeredConfigs = [];
};

export const onPeripheralTrigger = (
  interactionId: string,
  eventData: unknown,
) => {
  if (!registeredScene) {
    console.warn("onPeripheralTrigger: no peripheral context registered");
    return;
  }

  let matchedConfig: PeripheralConfig | undefined;
  let matchedInteraction: PeripheralInteraction | undefined;
  for (const config of registeredConfigs) {
    const found = config.interactions.find((i) => i.guid === interactionId);
    if (found) {
      matchedConfig = config;
      matchedInteraction = found;
      break;
    }
  }

  if (!matchedConfig || !matchedInteraction) {
    console.warn(
      `onPeripheralTrigger: no interaction found with id "${interactionId}"`,
    );
    return;
  }

  const actionType = matchedInteraction.type;
  const { outputForMaterials = {} } = matchedConfig;
  const materialMeshMap = buildMaterialMeshMap(registeredScene);

  const meshTargets: Record<string, Object3D[]> = {};
  for (const materialId of Object.keys(outputForMaterials)) {
    meshTargets[materialId] = materialMeshMap[materialId] ?? [];
  }

  if (actionType === "mouseClick") {
    console.log("triggered click:", interactionId, eventData);
  } else {
    const formattedOutputForMaterials =
      getUniformsForOutput(outputForMaterials);
    setUniforms(meshTargets, formattedOutputForMaterials, eventData);
  }
};
