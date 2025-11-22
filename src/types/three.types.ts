/* eslint-disable @typescript-eslint/no-explicit-any */

import { PositionConfig } from "./position.types";

// We declare some types as any here - because we have to use lazy loading for some types.
export type RaycasterConfig = {
  enabled: boolean;
};
export type OrbitControl = any;
export interface OrbitControlConfig {
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
}

export type CameraScreenAdjustmentConfig = {
  position: PositionConfig;
};
