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
import { CustomGeometryConfig } from "./mesh/types";
import { RaycasterConfig } from "../types/three.types";
import { OverlayConfig } from "../components/overlays/types";
import { InterNodeMap } from "../types";
import { PeripheralInteraction, PeripheralOutput } from "../peripheral/types";
import { TimelineConfig } from "./timeline/timeline.types";

export type BaseConfig = {
  guid: string;
  title: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PeripheralConfig = BaseConfig & {
  interactions: PeripheralInteraction[];
  outputForMaterials?: Record<string, PeripheralOutput>;
  outputForCamera?: unknown;
};

/** Saved audio-interaction preset; graph edges populate outputForMaterials per material. */
export type AudioInteractionConfig = BaseConfig & {
  outputForMaterials?: Record<string, Record<string, InterNodeMap>>;
};

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

export interface MeshGeometryConfig {
  rotation?: Partial<Position3d>;
  position?: Partial<Position3d>;
  scale?: number;
  assetId?: string;
  geometryType?: string;
}
export type MeshScreenAdjustmentConfig = Partial<
  Record<ScreenType, MeshGeometryConfig>
>;
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

export type SceneBackgroundColor = { type: "color"; color: string };

export type SceneBackgroundGradient = {
  type: "gradient";
  startColor: string;
  endColor: string;
  angle?: number;
};

export type SceneBackgroundAsset = { type: "asset"; assetGuid: string };

export type SceneBackground =
  | SceneBackgroundColor
  | SceneBackgroundGradient
  | SceneBackgroundAsset;

export type ResolvedSceneBackgroundAsset = {
  type: "asset";
  assetType: string;
  url: string;
};

export type ResolvedSceneBackground =
  | SceneBackgroundColor
  | SceneBackgroundGradient
  | ResolvedSceneBackgroundAsset;

export type ScenePropertiesConfig = {
  viewWidth?: string;
  viewHeight?: string;
  background?: SceneBackground;
  /** @deprecated use sceneProperties.background */
  backgroundColor?: string;
  /** @deprecated use sceneProperties.background */
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

export type RawWebglConfig = {
  planeGeometryConfig: {
    xSegments: number;
    ySegments: number;
  };
  drawMode: "TRIANGLES" | "POINTS";
  blending: {
    transparent: boolean;
    blendSrc: number;
    blendDst: number;
  };
  depthTest: boolean;
  clearColor: [number, number, number, number];
};
export type SceneConfig = {
  id: string;
  /** Schema version; missing means legacy (0). */
  configVersion?: number;
  engine?: string;
  title?: string;
  assetPath?: string;
  description?: string;
  rawWebglConfig?: RawWebglConfig;
  cameraConfig?: CameraConfig;
  controlsConfig?: Partial<ControlConfig>;
  assets?: Asset[];
  meshComponentConfigs: MeshComponentConfig[];
  peripheralInteractions: PeripheralConfig[];
  /** Optional; material graph audio-interaction nodes persist here. */
  audioInteractionConfigs?: AudioInteractionConfig[];
  meshTransforms?: MeshTransformConfig[];
  sceneMaterialConfigs: MaterialConfig[];
  sceneComponentConfigs?: SceneComponentConfig[];
  interactionConfigs?: InteractionConfig[];
  sceneProperties: SceneProperties;
  screenSizeAdjustments?: ScreenSizeAdjustmentConfig[];
  overlayConfig?: OverlayConfig[];
  /** Optional scene timelines (camera animations, etc.). */
  timeline?: TimelineConfig;
};

export type SceneProperties = {
  sceneId?: string;
  position: string;
  viewWidth: string;
  viewHeight: string;
  background: SceneBackground;
  /** Runtime Three.js texture; not persisted in scene config JSON. */
  backgroundTexture?: Texture;
  /** @deprecated migrated to background */
  backgroundColor?: string;
  /** @deprecated migrated to background */
  backgroundUrl?: string;
  /** @deprecated migrated to background */
  videoBackground?: string;
  fixed?: boolean;
  cursor?: string;
  zIndex?: number;
};

/** Scene properties after asset GUIDs in background are resolved to URLs. */
export type FormattedSceneProperties = Omit<
  SceneProperties,
  "background"
> & {
  background: ResolvedSceneBackground;
};

export type ThreeJsParams = {
  camera: PerspectiveCamera | OrthographicCamera;
  renderer?: RendererParams;
  controls?: Partial<ControlConfig>;
};

export type SceneData = {
  controlsConfig: Partial<ControlConfig>;
  meshes: Object3D[] | GLTF[];
  // sceneComponents: Object3D[];
  overlays: Asset[];

  sceneProperties: FormattedSceneProperties;
  postEffects: unknown[];
};

export type { GeometryConfig };
