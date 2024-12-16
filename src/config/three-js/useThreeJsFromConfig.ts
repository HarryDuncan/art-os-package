import { ControlConfig, ThreeJSConfig } from "../config.types";
import { useCallback } from "react";
import { useSetUpCamera } from "./use-camera/useCamera";

export const useThreeJsFromConfig = () => {
  const setUpCamera = useSetUpCamera();
  const setUpControls = useSetUpControls();
  return useCallback(
    (config: ThreeJSConfig) => {
      const camera = setUpCamera(config?.camera);
      const controls = setUpControls(config?.controls);
      return {
        camera,
        controls,
      };
    },
    [setUpCamera, setUpControls]
  );
};

const useSetUpControls = () =>
  useCallback(
    (controlsConfig?: Partial<ControlConfig>) =>
      controlsConfig
        ? {
            ...controlsConfig,
          }
        : {},
    []
  );
