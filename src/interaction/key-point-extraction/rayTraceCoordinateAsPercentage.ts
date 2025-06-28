import { Camera, Vector3, Ray } from "three";

export const rayTraceCoordinateAsPercentage = (
  normalizedCoords: { x: number; y: number },
  params: {
    camera: Camera;
    zTarget: number;
    rendererHeight: number;
    rendererWidth: number;
  }
) => {
  const { camera, zTarget, rendererHeight, rendererWidth } = params;

  if (!camera) {
    console.warn("Camera is required for rayTraceCoordinateAsPercentage");
    return {
      x: 0,
      y: 0,
      position: new Vector3(0, 0, 0),
    };
  }

  // Create normalized device coordinates directly from the input coordinates
  // normalizedCoords are already in normalized device coordinates (-1 to 1)
  const normalizedDeviceCoordinates = new Vector3(
    normalizedCoords.x,
    normalizedCoords.y, // Flip Y coordinate for WebGL
    0.5
  );

  normalizedDeviceCoordinates.unproject(camera);

  const ray = new Ray(
    camera.position,
    normalizedDeviceCoordinates.sub(camera.position).normalize()
  );

  const distance = (zTarget - ray.origin.z) / ray.direction.z;
  const worldPoint = ray.origin
    .clone()
    .add(ray.direction.clone().multiplyScalar(distance));

  return {
    x: worldPoint.x,
    y: worldPoint.y,
    position: worldPoint,
  };
};
