import { Vector3 } from "three";
import { MeshComponentConfig } from "config/config.types";
import { DEFAULT_POSITION } from "consts/threejs";
import { vector3DegreesToEuler } from "./degreesToEuler";

export const formatRotationFromConfig = (config: MeshComponentConfig) => {
  const rotation = new Vector3(0, 0, 0);
  rotation.setX(config.rotation?.x ?? 0);
  rotation.setY(config.rotation?.y ?? 0);
  rotation.setZ(config.rotation?.z ?? 0);
  const eulerRotation = vector3DegreesToEuler(rotation);
  return eulerRotation;
};
export const formatPositionFromConfig = (config: MeshComponentConfig) => {
  const position = { ...DEFAULT_POSITION };
  position.x = config?.position?.x ?? 0;
  position.y = config?.position?.y ?? 0;
  position.z = config?.position?.z ?? 0;
  return new Vector3(position.x, position.y, position.z);
};
