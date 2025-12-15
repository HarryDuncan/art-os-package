import { AnimationConfig } from "../animation/animation.types";
import { MaterialConfig } from "./material/types";
import { InteractionConfig } from "../interaction/types";
import { Asset } from "../assets/types";
import { GeometryConfig } from "../assets/geometry/geometry.types";
import { CameraConfig } from "./three-js/use-camera/camera.types";
import { ScreenType } from "../compat/window-state/types";
import {
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  Texture,
} from "three";
import { RendererParams } from "../hooks/use-three-js/renderer/renderer.types";
import { Position3d } from "../types/position.types";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  ComponentProps,
  SceneElementType,
} from "./components/threeJsComponents.types";
import { LightConfigs, SceneLight } from "../types/lights";
import { CustomGeometryConfig } from "./mesh/types";
import { RaycasterConfig } from "../types/three.types";
import { OverlayConfig } from "../components/overlays/types";
import { InterNodeMap } from "../types";

export type MultipleInstanceConfig = {
  instanceCount: number;
  boundingBoxConfig: {
    width: number;
    height: number;
    depth: number;
    center: Partial<Position3d>;
  };

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
  guid: string;
  name?: string;
  meshType: string;
  materialId?: string;
  rotation?: Partial<Position3d>;
  position?: Partial<Position3d>;
  multipleInstanceConfig?: MultipleInstanceConfig;
  geometryConfig?: GeometryConfig;
  groupId?: string;
  customGeometryConfig?: CustomGeometryConfig;
};

interface MeshGeometryConfig {
  rotation?: Partial<Position3d>;
  position?: Partial<Position3d>;
  scale: number;
}
export type MeshScreenAdjustmentConfig = Record<ScreenType, MeshGeometryConfig>;
export type MeshComponentConfig = MeshConfig & {
  geometryType?: string;
  assetId?: string;
  screenSizeAdjustment?: MeshScreenAdjustmentConfig;
  centerGeometryToOrigin?: boolean;
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

export type TransformValueConfig = {
  guid: string;
  value: unknown;
  type: string;
  relationship?: string;
};

export type MeshTransformConfig = {
  guid: string;
  transformedMeshIds: string[];
  values: Record<string, TransformValueConfig>;
  outputMapping: Record<string, InterNodeMap>;
  inputMapping: Record<string, InterNodeMap>;
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
  cameraConfig?: CameraConfig;
  controlsConfig?: Partial<ControlConfig>;
  assets?: Asset[];
  meshComponentConfigs: MeshComponentConfig[];
  // advancedMeshConfigs?: AdvancedMeshConfig[];
  meshTransforms?: MeshTransformConfig[];
  sceneMaterialConfigs: MaterialConfig[];
  animationConfig: AnimationConfig[];
  lightConfig: LightConfigs[];
  sceneComponentConfigs?: SceneComponentConfig[];
  interactionConfigs?: InteractionConfig[];
  sceneProperties: SceneProperties;
  screenSizeAdjustments?: ScreenSizeAdjustmentConfig[];
  overlayConfig?: OverlayConfig[];
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
  controlsConfig: Partial<ControlConfig>;
  animationConfig?: AnimationConfig[];
  meshes: Object3D[] | GLTF[];
  // sceneComponents: Object3D[];
  overlays: Asset[];
  lights: SceneLight[];
  sceneProperties: SceneProperties;
  postEffects: unknown[];
};

export type { GeometryConfig };
