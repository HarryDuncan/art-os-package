import { Vector2, Camera, Vector3, Ray } from "three";
import { EVENT_KEYS } from "../peripheral-interactions/peripheralInteractions.consts";

export const mouseMoveKeyPoints = (
  event: MouseEvent,
  params: {
    camera: Camera;
    rendererHeight: number;
    rendererWidth: number;
    zTarget: number;
  }
) => {
  const { camera, rendererHeight, rendererWidth, zTarget } = params;
  if (!camera || !rendererHeight || !rendererWidth) {
    console.warn(
      "Camera, rendererHeight, rendererWidth are required for mouseMoveKeyPoints"
    );
    return {
      x: event.clientX,
      y: event.clientY,
      position: new Vector2(0, 0),
    };
  }
  const normalizedDeviceCoordinates = new Vector3(
    (event.clientX / rendererWidth) * 2 - 1,
    -(event.clientY / rendererHeight) * 2 + 1,
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
    position: new Vector2(worldPoint.x, worldPoint.y),
  };
};

export const KEY_POINT_EXTRACTORS = {
  [EVENT_KEYS.MOUSE_MOVE]: mouseMoveKeyPoints,
};
