import { ScreenType } from "../../../compat/window-state/types";
import { CameraScreenAdjustmentConfig } from "../../../types";
import { PositionConfig } from "../../../types/position.types";

export const CAMERA_TYPES = {
  PERSPECTIVE_CAMERA: "perspectiveCamera",
  ORTHOGRAPHIC_CAMERA: "orthographicCamera",
};
export type CameraType = keyof typeof CAMERA_TYPES;

export interface CameraConfig {
  cameraType: CameraType;
  position: PositionConfig;
  perspectiveCameraConfig?: PerspectiveCameraConfig;
  orthographicCameraConfig?: OrthographicCameraConfig;
  screenSizeAdjustment?: Record<ScreenType, CameraScreenAdjustmentConfig>;
}

export interface OrthographicCameraConfig {
  frustumSize: number;
}
export interface PerspectiveCameraConfig {
  fov: number;
  aspect: number;
  near: number;
  far: number;
}
