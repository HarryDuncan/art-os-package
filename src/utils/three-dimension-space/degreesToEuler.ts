import { Vector3 } from "three";

export const degreesToEuler = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const vector3DegreesToEuler = (xyzObject: Vector3): Vector3 => {
  const x = degreesToEuler(xyzObject.x);
  const y = degreesToEuler(xyzObject.y);
  const z = degreesToEuler(xyzObject.z);
  return new Vector3(x, y, z);
};
