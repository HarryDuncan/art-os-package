import { useCallback } from "react";
import { OrthographicCamera, PerspectiveCamera } from "three";
import { CAMERA_TYPES, CameraConfig } from "./camera.types";
import { useWindowState } from "../../../compat/window-state/windowStateProvider";
import { DEFAULT_ORTHOGRAPHIC, DEFAULT_PERSPECTIVE } from "./camera.consts";
import { positionConfigToPosition } from "../../../utils/conversion/conversion";

export const useSetUpCamera = () => {
  const {
    state: {
      windowSize: { width, height },
    },
  } = useWindowState();
  const aspect = width / height;

  return useCallback(
    (config?: CameraConfig) => {
      const camera = getCamera(aspect, config);
      const { x, y, z } = positionConfigToPosition(config?.position ?? {});
      camera.position.set(x, y, z);
      return camera;
    },
    [aspect]
  );
};

const getCamera = (aspect: number, config?: CameraConfig) => {
  switch (config?.cameraType) {
    case CAMERA_TYPES.ORTHOGRAPHIC_CAMERA: {
      const { orthographicCameraConfig = DEFAULT_ORTHOGRAPHIC } = config || {};
      const { frustumSize } = orthographicCameraConfig;
      const camera = new OrthographicCamera(
        frustumSize / -2,
        frustumSize / 2,
        frustumSize / 2,
        frustumSize / -2,
        -1000,
        1000
      );
      return camera;
    }
    case CAMERA_TYPES.PERSPECTIVE_CAMERA:
    default: {
      const { perspectiveCameraConfig = DEFAULT_PERSPECTIVE } = config || {};
      const { fov, near, far } = perspectiveCameraConfig;
      const camera = new PerspectiveCamera(fov, aspect, near, far);
      return camera;
    }
  }
};
