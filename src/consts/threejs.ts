import { MeshBasicMaterial, Vector3 } from "three";
import { OrbitControlConfig } from "../types";

export const DEFAULT_POSITION = { x: 0, y: 0, z: 0 };
export const DEFAULT_VECTOR_POSITION = new Vector3(0, 0, 0);

export const GREEN_SCREEN = new MeshBasicMaterial({
  color: "#00ff00",
});

export const DEFAULT_ORBIT_CONTROL_CONFIG: OrbitControlConfig = {
  autoRotate: false,
  autoRotateSpeed: 10,
  dampingFactor: 0.25,
  enabled: true,
  enableDamping: false,
  enablePan: false,
  enableRotate: false,
  enableZoom: false,
  keyPanSpeed: 0,
  keys: {
    LEFT: "",
    UP: "",
    RIGHT: "",
    BOTTOM: "",
  },
  maxAzimuthAngle: 0,
  maxDistance: 0,
  maxPolarAngle: 0,
  maxZoom: 0,
  minAzimuthAngle: 0,
  minDistance: 0,
  minPolarAngle: 0,
  minZoom: 0,
  mouseButtons: {
    LEFT: 0,
    MIDDLE: 0,
    RIGHT: 0,
  },
  rotateSpeed: 0,
  screenSpacePanning: false,
  touches: {
    ONE: 0,
    TWO: 0,
  },
};
