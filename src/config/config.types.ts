import { AnimationConfig } from "display/animation/animation.types";
import {
  LightConfigs,
  SceneLight,
} from "display/scene-elements/lights/lights.types";
import { MaterialConfig } from "config/material/materials.types";
import { InteractionConfig } from "interaction/interactions.types";
import { Asset } from "assets/asset.types";
import { GeometryConfig } from "../assets/geometry/geometry.types";
import { CameraConfig } from "config/three-js/use-camera/camera.types";
import {
  ComponentProps,
  SceneElementType,
} from "display/scene-elements/components/threeJsComponents.types";
import { MESH_TRANSFORM } from "./mesh/mesh.consts";
import { ScreenType } from "compat/window-state/types";
import {
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  Texture,
} from "three";
import { RendererParams } from "display/hooks/use-three-js/renderer/types";
import { Position3d } from "utils/three-dimension-space/position/position.types";
import { AttributeConfig } from "./material/shaders/build-shader/types";
import { SceneConfigType } from "./config.constants";
import { AdvancedMeshConfig } from "./mesh/advanced-mesh/advancedMesh.types";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

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
  materialId?: string;
  rotation?: Partial<Position3d>;
  position?: Partial<Position3d>;
  multipleConfig?: MultipleConfig;
  randomizationConfig?: RandomizationConfig;
  geometryConfig?: GeometryConfig;
  groupId?: string;
  meshType: string;
};
export type MeshComponentConfig = MeshConfig & {
  geometryId?: string;
};

export type ControlConfig = {
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
export type ThreeJSConfig = {
  camera?: CameraConfig;
  controls?: ControlConfig;
};

export type ScenePropertiesConfig = {
  viewWidth?: string;
  viewHeight?: string;
  backgroundColor?: string;
  backgroundUrl?: string;
  position?: string;
};
export type MeshTransformType = keyof typeof MESH_TRANSFORM;
export type MeshTransformConfig = {
  type: MeshTransformType;
  transformedMeshIds: string[];
  materialId?: string;
  attributeConfig?: AttributeConfig[];
};

export type ScreenSizeAdjustmentConfig = {
  screenType: ScreenType;
  meshComponentConfigs?: Partial<MeshComponentConfig>[];
  threeJsConfig: Partial<ThreeJSConfig>;
};

export type SceneConfig = {
  sceneConfigType?: SceneConfigType;
  assets?: Asset[];
  meshComponentConfigs: MeshComponentConfig[];
  advancedMeshConfigs?: AdvancedMeshConfig[];
  meshTransforms?: MeshTransformConfig[];
  globalMaterialConfigs: MaterialConfig[];
  animationConfig: AnimationConfig[];
  lightConfig: LightConfigs[];
  sceneComponentConfigs?: SceneComponentConfig[];
  interactionConfig?: InteractionConfig[];
  threeJsConfig: ThreeJSConfig;
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
};

export type ThreeJsParams = {
  camera: PerspectiveCamera | OrthographicCamera;
  renderer?: RendererParams;
  controls?: Partial<ControlConfig>;
};

export type SceneData = {
  threeJs: ThreeJsParams;
  meshes: Object3D[] | GLTF[];
  sceneComponents: Object3D[];
  lights: SceneLight[];
  sceneProperties: SceneProperties;
};
