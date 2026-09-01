import { Position3d } from "../types/position.types";
import { ParameterControlConfig } from "../config/material/shaders/schema/controls/types";

export type ParameterControlSelector = {
  materialIds?: string[];
  meshIds?: string[];
};

export type Vec3Params = Partial<Position3d>;

export type MeshTransformParams = {
  position?: Vec3Params;
  rotation?: Vec3Params;
  scale?: Vec3Params;
};

export type CameraParams = {
  position?: Vec3Params;
  lookAt?: Position3d;
  rotation?: Vec3Params;
  fov?: number;
  near?: number;
  far?: number;
};

export type UniformSnapshot = {
  key: string;
  /** Human-readable label (parameter key stripped from `u_key_guid`; falls back to key). */
  name: string;
  /** Coarse type hint for UI widgets: float | vec2 | vec3 | vec4 | bool | int | other */
  valueType: string;
  value: unknown;
  /** UI controller config from the parameter's `controlsConfig`, if any. */
  controlsConfig: ParameterControlConfig | null;
};

export type MeshSnapshot = {
  id: string;
  /** Human-readable label from scene config (falls back to id). */
  name: string;
  materialId: string | null;
  position: Position3d;
  rotation: Position3d;
  scale: Position3d;
};

export type MaterialSnapshot = {
  id: string;
  /** Human-readable label from scene config (falls back to id). */
  name: string;
  uniforms: UniformSnapshot[];
};

export type CameraSnapshot = {
  type: string;
  position: Position3d;
  rotation: Position3d;
  /** Approximate world-space look-at target derived from camera orientation. */
  lookAt?: Position3d;
  fov?: number;
  near?: number;
  far?: number;
};

export type ParameterControlSnapshot = {
  meshes: MeshSnapshot[];
  materials: MaterialSnapshot[];
  camera: CameraSnapshot | null;
};
