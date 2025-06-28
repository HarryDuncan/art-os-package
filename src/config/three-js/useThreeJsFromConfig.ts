import {
  ControlConfig,
  SceneConfig,
  ThreeJSConfig,
} from "../../types/config.types";
import { useCallback } from "react";
import { useSetUpCamera } from "./use-camera/useCamera";

export const useThreeJsFromConfig = (config: SceneConfig) => {
  const setUpCamera = useSetUpCamera(config?.threeJsConfig?.camera);
  const setUpControls = useSetUpControls();
  return useCallback(
    (config: ThreeJSConfig) => {
      const controls = setUpControls(config?.controls);
      return {
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
