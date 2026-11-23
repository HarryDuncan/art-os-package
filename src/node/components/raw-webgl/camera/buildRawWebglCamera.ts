import {
  CAMERA_TYPES,
  CameraConfig,
} from "../../../../config/three-js/use-camera/camera.types";
import {
  DEFAULT_ORTHOGRAPHIC,
  DEFAULT_PERSPECTIVE,
} from "../../../../config/three-js/use-camera/camera.consts";
import { createMat4, identity, lookAt, ortho, perspective } from "../math/mat4";

// Matches the near/far `useCamera` gives three.js orthographic cameras.
const ORTHOGRAPHIC_NEAR = -1000;
const ORTHOGRAPHIC_FAR = 1000;

export type RawWebglCamera = {
  viewMatrix: Float32Array;
  projectionMatrix: Float32Array;
  // Recompute `projectionMatrix` in place for a new canvas aspect ratio.
  setAspect: (aspect: number) => void;
};

// Raw-WebGL equivalent of `useCamera`: same camera types, defaults and
// framing, so a scene authored against the three.js engine frames the same
// way here. With no `cameraConfig` both matrices stay identity and meshes are
// drawn straight in clip space (the legacy fullscreen-plane behaviour).
export const buildRawWebglCamera = (
  cameraConfig: Partial<CameraConfig> | undefined,
): RawWebglCamera => {
  const viewMatrix = createMat4();
  const projectionMatrix = createMat4();

  if (!cameraConfig) {
    return { viewMatrix, projectionMatrix, setAspect: () => {} };
  }

  const eye = {
    x: cameraConfig.position?.x ?? 0,
    y: cameraConfig.position?.y ?? 0,
    z: cameraConfig.position?.z ?? 0,
  };
  lookAt(viewMatrix, eye, cameraConfig.lookAt);

  if (cameraConfig.cameraType === CAMERA_TYPES.ORTHOGRAPHIC_CAMERA) {
    const { frustumSize } =
      cameraConfig.orthographicCameraConfig ?? DEFAULT_ORTHOGRAPHIC;
    const half = frustumSize / 2;
    // three.js `useCamera` builds a square frustum regardless of aspect;
    // mirrored here so both engines frame orthographic scenes identically.
    ortho(
      projectionMatrix,
      -half,
      half,
      -half,
      half,
      ORTHOGRAPHIC_NEAR,
      ORTHOGRAPHIC_FAR,
    );
    return { viewMatrix, projectionMatrix, setAspect: () => {} };
  }

  const { fov, near, far } =
    cameraConfig.perspectiveCameraConfig ?? DEFAULT_PERSPECTIVE;
  const setAspect = (aspect: number) => {
    if (!(aspect > 0)) {
      identity(projectionMatrix);
      return;
    }
    perspective(projectionMatrix, fov, aspect, near, far);
  };
  setAspect(1);
  return { viewMatrix, projectionMatrix, setAspect };
};
