import { Vector3 } from "three";

export const vector3ToPosition3d = (vector: Vector3) => ({
  x: vector.x,
  y: vector.y,
  z: vector.z,
});
