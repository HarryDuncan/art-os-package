import { Euler, Quaternion, Vector3 } from "three";

export const rotatePlaneToFaceCoordinate = (
  currentPosition: Vector3,
  targetCoordinate: Vector3
) => {
  const direction = new Vector3()
    .subVectors(targetCoordinate, currentPosition)
    .normalize();
  const rotation = new Euler().setFromQuaternion(
    new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), direction)
  );
  return { x: rotation.x, y: rotation.y, z: rotation.z };
};
