import {
  ANIMATION_RUN_STYLES,
  ANIMATION_TYPES,
} from "./animation/animation.constants";
import { MESH_TYPES } from "../config/mesh/consts";
import { DEFAULT_LIGHTS } from "./lights/lights";

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
  cameraConfig: { position: { x: 0, y: 0, z: 450 } },
  assets: [],
  meshComponentConfigs: [],
  sceneMaterialConfigs: [],
  advancedMeshConfigs: [],
  meshTransforms: [],
  animationConfig: [],
  lightConfig: DEFAULT_LIGHTS,
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
