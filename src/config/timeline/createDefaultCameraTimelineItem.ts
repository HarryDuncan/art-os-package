import { getParameterControlSnapshot } from "../../parameter-control/snapshot";
import {
  CameraTimelineItem,
  TIMELINE_EASING,
  TIMELINE_ITEM_TYPES,
  TIMELINE_REPEAT,
} from "./timeline.types";

const pos = (x: number, y: number, z: number) => ({ x, y, z });

const defaultLookAtFromPosition = (position: {
  x: number;
  y: number;
  z: number;
}) => pos(position.x, position.y - 0.5, position.z - 5);

export const createDefaultCameraTimelineItem = (
  id: string,
  title = "Camera animation",
  description = "",
): CameraTimelineItem => {
  const snapshot = getParameterControlSnapshot();
  const cam = snapshot?.camera;

  const startPos = cam?.position ?? pos(0, 2, 5);
  const endPos = pos(startPos.x, startPos.y, startPos.z - 3);
  const startFov = cam?.fov ?? 75;
  const endFov = startFov * 0.85;

  const startLookAt = cam?.lookAt ?? defaultLookAtFromPosition(startPos);
  const endLookAt = defaultLookAtFromPosition(endPos);

  const dx = endPos.x - startPos.x;
  const dy = endPos.y - startPos.y;
  const dz = endPos.z - startPos.z;

  const lookDx = endLookAt.x - startLookAt.x;
  const lookDy = endLookAt.y - startLookAt.y;
  const lookDz = endLookAt.z - startLookAt.z;

  return {
    id,
    title,
    description,
    type: TIMELINE_ITEM_TYPES.CAMERA,
    duration: 5,
    easing: TIMELINE_EASING.EASE_IN_OUT,
    repeat: TIMELINE_REPEAT.PING_PONG,
    enabled: false,
    start: {
      position: { ...startPos },
      fov: startFov,
      lookAt: { ...startLookAt },
    },
    end: {
      position: { ...endPos },
      fov: endFov,
      lookAt: { ...endLookAt },
    },
    bezier: {
      controlPoint1: pos(
        startPos.x + dx / 3,
        startPos.y + dy / 3 + 0.5,
        startPos.z + dz / 3,
      ),
      controlPoint2: pos(
        startPos.x + (dx * 2) / 3,
        startPos.y + (dy * 2) / 3 + 0.5,
        startPos.z + (dz * 2) / 3,
      ),
    },
    lookAtBezier: {
      controlPoint1: pos(
        startLookAt.x + lookDx / 3,
        startLookAt.y + lookDy / 3,
        startLookAt.z + lookDz / 3,
      ),
      controlPoint2: pos(
        startLookAt.x + (lookDx * 2) / 3,
        startLookAt.y + (lookDy * 2) / 3,
        startLookAt.z + (lookDz * 2) / 3,
      ),
    },
  };
};
