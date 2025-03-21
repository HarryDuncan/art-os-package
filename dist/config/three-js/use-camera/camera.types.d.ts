import { PositionConfig } from "../../../utils/three-dimension-space/position/position.types";
export declare const CAMERA_TYPES: {
    PERSPECTIVE_CAMERA: string;
    ORTHOGRAPHIC_CAMERA: string;
};
export type CameraType = keyof typeof CAMERA_TYPES;
export interface CameraConfig {
    cameraType: CameraType;
    position: PositionConfig;
    perspectiveCameraConfig?: PerspectiveCameraConfig;
    orthographicCameraConfig?: OrthographicCameraConfig;
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
