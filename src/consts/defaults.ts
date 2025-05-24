import {
  ANIMATION_RUN_STYLES,
  ANIMATION_TYPES,
} from "./animation/animation.constants";
import {
  DEFAULT_PHONG_PROPS,
  MATERIAL_TYPES,
} from "./materials/materials.consts";
import { MESH_TYPES } from "../config/mesh/mesh.consts";
import { DEFAULT_LIGHTS } from "./lights/lights";
import {
  BLENDING_DIST,
  BLENDING_SRC,
  BLENDING_TYPES,
} from "../config/material/blending-options/blendingOptions.consts";

const DEFAULT_THREE_JS_CONFIG = {
  camera: { position: { x: 0, y: 0, z: 450 } },
};

export const DEFAULT_SCENE_PROPERTIES = {
  viewWidth: "100vw",
  viewHeight: "100vh",
  backgroundColor: "white",
  backgroundUrl: "",
  position: "fixed",
};

export const DEFAULT_CONFIG = {
  title: "",
  assetPath: "",
  description: "",
  threeJsConfig: DEFAULT_THREE_JS_CONFIG,
  assets: [],
  meshComponentConfigs: [],
  sceneMaterialConfigs: [],
  advancedMeshConfigs: [],
  meshTransforms: [],
  animationConfig: [],
  lightConfig: DEFAULT_LIGHTS,
  sceneComponentConfigs: [],
  interactionConfig: [],
  scenePropertiesConfig: DEFAULT_SCENE_PROPERTIES,
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

export const DEFAULT_ANIMATION_CONFIG = {
  id: "",
  runStyle: ANIMATION_RUN_STYLES.CHAIN,
  targetIdentifier: "",
  animationProperties: {
    animationType: ANIMATION_TYPES.ROTATE,
    animationDurationMilis: 2000,
    repeatAnimation: true,
    animationPauseMilis: 0,
    properties: {
      rotation: { x: 0, y: 360, z: 0 },
      position: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
    },
  },
  isRunning: false,
};

export const DEFAULT_BLENDING_CONFIG = {
  blendingType: BLENDING_TYPES.NORMAL_BLENDING,
  blendSrcKey: BLENDING_SRC.ONE,
  blendDstKey: BLENDING_DIST.ONE,
  transparent: false,
  depthTest: true,
};
export const DEFAULT_MATERIAL_CONFIG = {
  id: "default-material",
  materialType: MATERIAL_TYPES.PHONG,
  materialProps: DEFAULT_PHONG_PROPS,
  blendingConfig: DEFAULT_BLENDING_CONFIG,
};
