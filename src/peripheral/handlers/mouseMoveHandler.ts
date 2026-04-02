import { Vector2, Camera, Vector3, Ray } from "three";

export const mousePositionHandler = (
  event: MouseEvent,
  params: {
    camera: Camera;
    rendererHeight: number;
    rendererWidth: number;
    zTarget: number;
  },
) => {
  const { camera, rendererHeight, rendererWidth, zTarget } = params;
  if (!camera || !rendererHeight || !rendererWidth) {
    console.warn(
      "Camera, rendererHeight, rendererWidth are required for mousePositionHandler",
    );
    return new Vector2(0, 0);
  }
  const normalizedDeviceCoordinates = new Vector3(
    (event.clientX / rendererWidth) * 2 - 1,
    -(event.clientY / rendererHeight) * 2 + 1,
    0.5,
  );
  normalizedDeviceCoordinates.unproject(camera);

  const ray = new Ray(
    camera.position,
    normalizedDeviceCoordinates.sub(camera.position).normalize(),
  );

  const distance = (zTarget - ray.origin.z) / ray.direction.z;
  const worldPoint = ray.origin
    .clone()
    .add(ray.direction.clone().multiplyScalar(distance));

  return new Vector2(worldPoint.x, worldPoint.y);
};
