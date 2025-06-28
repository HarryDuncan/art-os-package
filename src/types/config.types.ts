import { AnimationConfig } from "./animation.types";
import { MaterialConfig } from "./materials";
import { InteractionConfig } from "../interaction/interaction.types";
import { Asset } from ".";
import { GeometryConfig } from "../assets/geometry/geometry.types";
import { CameraConfig } from "../config/three-js/use-camera/camera.types";
import { MESH_TRANSFORM_TYPE } from "../consts";
import { ScreenType } from "../compat/window-state/types";
import {
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  Texture,
} from "three";
import { RendererParams } from "../hooks/use-three-js/renderer/renderer.types";
import { Position3d } from "./position.types";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  ComponentProps,
  SceneElementType,
} from "../config/components/threeJsComponents.types";
import { LightConfigs, SceneLight } from "./lights";
import { CustomGeometryConfig } from "../config/mesh/mesh.types";
import { ParameterConfig } from "../config/material/shaders/build-shader/buildShader.types";

export type MultipleConfig = {
  instanceCount: number;
  boundingBoxConfig: {
    width: number;
    height: number;
    depth: number;
    center: Partial<Position3d>;
  };
};
export type RandomizationConfig = MultipleConfig & {
  randomRotation?: boolean;
};

export type SceneComponentConfig = {
  id: string;
  componentType: SceneElementType;
  componentProps: ComponentProps;
  materialId?: string;
};

export type MeshConfig = {
  id: string;
  name?: string;
  meshType: string;
  materialId?: string;
  rotation?: Partial<Position3d>;
  position?: Partial<Position3d>;
  multipleConfig?: MultipleConfig;
  randomizationConfig?: RandomizationConfig;
  geometryConfig?: GeometryConfig;
  groupId?: string;
  customGeometryConfig?: CustomGeometryConfig;
};

export type MeshComponentConfig = MeshConfig & {
  geometryType?: string;
  assetId?: string;
};

export type ControlConfig = {
  target: Position3d;
  autoRotate: boolean;
  autoRotateSpeed: number;
  dampingFactor: number;
  enabled: boolean;
  enableDamping: boolean;
  enablePan: boolean;
  enableRotate: boolean;
  enableZoom: boolean;
  keyPanSpeed: number;
  keys: {
    LEFT: string;
    UP: string;
    RIGHT: string;
    BOTTOM: string;
  };
  maxAzimuthAngle: number;
  maxDistance: number;
  maxPolarAngle: number;
  maxZoom: number;
  minAzimuthAngle: number;
  minDistance: number;
  minPolarAngle: number;
  minZoom: number;
  mouseButtons: {
    LEFT: number;
    MIDDLE: number;
    RIGHT: number;
  };
  rotateSpeed: number;
  screenSpacePanning: boolean;
  touches: {
    ONE: number;
    TWO: number;
  };
};
export type RaycasterConfig = {
  enabled: boolean;
};
export type ThreeJSConfig = {
  camera?: CameraConfig;
  controls?: ControlConfig;
  raycaster?: RaycasterConfig;
};

export type ScenePropertiesConfig = {
  viewWidth?: string;
  viewHeight?: string;
  backgroundColor?: string;
  backgroundUrl?: string;
  position?: string;
};
export type MeshTransformType = keyof typeof MESH_TRANSFORM_TYPE;

export type TransformValueConfig = {
  value: unknown;
  type: string;
};

export type MeshTransformConfig = {
  id: string;
  guid?: string;
  effectId?: string;
  type: MeshTransformType;
  transformedMeshIds: string[];
  parameterIds?: string[];
  materialId?: string;
  transformParameterConfigs?: ParameterConfig[];
  values: Record<string, TransformValueConfig>;
};

export type ScreenSizeAdjustmentConfig = {
  screenType: ScreenType;
  meshComponentConfigs?: Partial<MeshComponentConfig>[];
  threeJsConfig: Partial<ThreeJSConfig>;
};

export type SceneConfig = {
  id: string;
  title?: string;
  assetPath?: string;
  description?: string;
  threeJsConfig: ThreeJSConfig;
  assets?: Asset[];
  meshComponentConfigs: MeshComponentConfig[];
  // advancedMeshConfigs?: AdvancedMeshConfig[];
  meshTransforms?: MeshTransformConfig[];
  sceneMaterialConfigs: MaterialConfig[];
  animationConfig: AnimationConfig[];
  lightConfig: LightConfigs[];
  sceneComponentConfigs?: SceneComponentConfig[];
  interactionConfig?: InteractionConfig[];
  scenePropertiesConfig: ScenePropertiesConfig;
  screenSizeAdjustments?: ScreenSizeAdjustmentConfig[];
};

export type SceneProperties = {
  sceneId?: string;
  position: string;
  viewWidth: string;
  viewHeight: string;
  backgroundColor: string;
  backgroundUrl: string;
  background?: Texture;
  videoBackground?: string;
  fixed?: boolean;
  cursor?: string;
};

export type ThreeJsParams = {
  camera: PerspectiveCamera | OrthographicCamera;
  renderer?: RendererParams;
  controls?: Partial<ControlConfig>;
};

export type SceneData = {
  threeJsParams: ThreeJsParams;
  animationConfig?: AnimationConfig[];
  meshes: Object3D[] | GLTF[];
  sceneComponents: Object3D[];
  lights: SceneLight[];
  sceneProperties: SceneProperties;
};

export type { GeometryConfig };
