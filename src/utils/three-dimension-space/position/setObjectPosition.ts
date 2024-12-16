import { Object3D, Vector3 } from "three";

export const setObjectPosition = (object: Object3D, position: Vector3) => {
  const { x, y, z } = position;
  object.position.set(x, y, z);
};
