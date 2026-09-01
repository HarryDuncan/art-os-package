import {
  CameraTimelineItem,
  TIMELINE_ITEM_TYPES,
} from "../../config/timeline/timeline.types";
import { applyEasing } from "./easing";
import { cubicBezier3D, lerpScalar } from "./bezier";
import { normalizeTimelineProgress } from "./repeat";

const lerpPosition = (
  a: { x?: number; y?: number; z?: number },
  b: { x?: number; y?: number; z?: number },
  t: number,
): { x: number; y: number; z: number } => ({
  x: lerpScalar(a.x ?? 0, b.x ?? 0, t),
  y: lerpScalar(a.y ?? 0, b.y ?? 0, t),
  z: lerpScalar(a.z ?? 0, b.z ?? 0, t),
});

export type EvaluatedCameraState = {
  position: { x: number; y: number; z: number };
  fov?: number;
  lookAt?: { x: number; y: number; z: number };
};

export const evaluateCameraTimeline = (
  item: CameraTimelineItem,
  elapsed: number,
): EvaluatedCameraState => {
  const rawT = normalizeTimelineProgress(elapsed, item.duration, item.repeat);
  const t = applyEasing(rawT, item.easing);

  const position = cubicBezier3D(
    item.start.position,
    item.bezier.controlPoint1,
    item.bezier.controlPoint2,
    item.end.position,
    t,
  );

  const startFov = item.start.fov;
  const endFov = item.end.fov;
  const fov =
    startFov !== undefined && endFov !== undefined
      ? lerpScalar(startFov, endFov, t)
      : startFov ?? endFov;

  const startLookAt = item.start.lookAt;
  const endLookAt = item.end.lookAt;
  let lookAt: EvaluatedCameraState["lookAt"];

  if (startLookAt && endLookAt) {
    if (item.lookAtBezier) {
      lookAt = cubicBezier3D(
        startLookAt,
        item.lookAtBezier.controlPoint1,
        item.lookAtBezier.controlPoint2,
        endLookAt,
        t,
      );
    } else {
      lookAt = lerpPosition(startLookAt, endLookAt, t);
    }
  } else if (startLookAt) {
    lookAt = {
      x: startLookAt.x ?? 0,
      y: startLookAt.y ?? 0,
      z: startLookAt.z ?? 0,
    };
  } else if (endLookAt) {
    lookAt = {
      x: endLookAt.x ?? 0,
      y: endLookAt.y ?? 0,
      z: endLookAt.z ?? 0,
    };
  }

  return { position, fov, lookAt };
};

export const isCameraTimelineItem = (
  item: { type: string },
): item is CameraTimelineItem => item.type === TIMELINE_ITEM_TYPES.CAMERA;
