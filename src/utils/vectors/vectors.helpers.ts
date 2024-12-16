import { Vector3 } from "three";

export const calculateDistanceBetweenVectors = (
  vectorA: Vector3,
  vectorB: Vector3
): number => {
  const dx = vectorB.x - vectorA.x;
  const dy = vectorB.y - vectorA.y;
  const dz = vectorB.z - vectorA.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};
