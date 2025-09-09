import { useEffect } from "react";
import { OrthographicCamera, PerspectiveCamera } from "three";
import { CAMERA_TYPES, CameraConfig } from "./camera.types";
import { useWindowState } from "../../../compat/window-state/windowStateProvider";
import { DEFAULT_ORTHOGRAPHIC, DEFAULT_PERSPECTIVE } from "./camera.consts";
import { positionConfigToPosition } from "../../../utils/conversion/conversion";
import { useSceneContext } from "../../../context/context";

export const useCamera = (config: Partial<CameraConfig> | undefined) => {
  const { camera } = useSceneContext();
  const {
    state: {
      windowSize: { width, height },
    },
  } = useWindowState();
  const aspect = width / height;

  useEffect(() => {
    if (!camera.current && config && aspect) {
      const cameraConfig = config as CameraConfig;
      const newCamera = getCamera(aspect, cameraConfig);
      const { x, y, z } = positionConfigToPosition(config?.position ?? {});
      newCamera.position.set(x, y, z);
      camera.current = newCamera;
    }
  }, [camera, config, aspect]);
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
