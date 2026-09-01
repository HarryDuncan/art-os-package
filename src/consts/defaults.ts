import { MESH_TYPES } from "../config/mesh/consts";
import { ENGINE } from "./consts";
import { CURRENT_SCENE_CONFIG_VERSION } from "../config/scene-migrations";

export const DEFAULT_SCENE_PROPERTIES = {
  viewWidth: "100vw",
  viewHeight: "100vh",
  position: "fixed",
  background: { type: "color" as const, color: "white" },
};

export const DEFAULT_CONFIG = {
  configVersion: CURRENT_SCENE_CONFIG_VERSION,
  title: "",
  assetPath: "",
  description: "",
  engine: ENGINE.THREE,
  cameraConfig: { position: { x: 0, y: 0, z: 450 } },
  assets: [],
  meshComponentConfigs: [],
  sceneMaterialConfigs: [],
  meshTransforms: [],
  sceneComponentConfigs: [],
  interactionConfigs: [],
  sceneProperties: DEFAULT_SCENE_PROPERTIES,
  screenSizeAdjustments: [],
};

export const DEFAULT_MESH_CONFIG = {
  id: ``,
  assetId: "EMPTY",
  meshType: MESH_TYPES.MESH,
  geometryConfig: {
    scale: 1,
  },
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  materialId: "",
};
