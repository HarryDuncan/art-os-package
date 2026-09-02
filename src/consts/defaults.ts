import { MESH_TYPES } from "../config/mesh/consts";
import { ENGINE } from "./consts";

/** Known scene config schema versions. Missing `configVersion` means legacy (0). */
export const SCENE_CONFIG_VERSIONS = {
  LEGACY: 0,
  BACKGROUND: 1,
  VIEW_UNITS: 2,
} as const;

export type SceneConfigVersion =
  (typeof SCENE_CONFIG_VERSIONS)[keyof typeof SCENE_CONFIG_VERSIONS];

/** Latest schema version applied by scene config middleware. */
export const CURRENT_SCENE_CONFIG_VERSION =
  SCENE_CONFIG_VERSIONS.VIEW_UNITS satisfies SceneConfigVersion;

export const DEFAULT_SCENE_PROPERTIES = {
  viewWidth: "100%",
  viewHeight: "100%",
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
