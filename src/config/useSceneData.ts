import { useMemo } from "react";
import { getLightsFromConfig } from "../config/lights/getLightsFromConfig";
import { formatSceneMaterials } from "../config/material/formatSceneMaterials";
import { getMeshesFromConfig } from "../config/mesh/getMeshesFromConfig";
import { SceneConfig, SceneData } from "./config.types";
import { getScenePropertiesFromConfig } from "./scene-properties/setSceneProperties";
import { useScreenSizeProperties } from "./scene-properties/useScreenSizeProperties";
import { useWindowState } from "../compat/window-state/windowStateProvider";
import { useInitializeVideos } from "../assets/animated-texture/useInitializeVideos";
import { Asset } from "../assets/types";
import { useCamera } from "./three-js/use-camera/useCamera";
// import { useSetUpMaterials } from "./material/useSetUpMaterials";

export const useSceneData = (
  config: SceneConfig | undefined | null,
  assets: Asset[]
): SceneData | null => {
  useInitializeVideos(assets);

  const {
    state: { screenType },
  } = useWindowState();
  const formattedConfig = useScreenSizeProperties(config, screenType);
  useCamera(formattedConfig?.cameraConfig);
  // const materials = useSetUpMaterials(formattedConfig?.sceneMaterialConfigs);
  return useMemo(() => {
    if (!formattedConfig) return null;
    const materials = formatSceneMaterials(assets, formattedConfig);
    const meshes = getMeshesFromConfig(assets, materials, formattedConfig);

    const animationConfig = config?.animationConfig ?? [];

    const lights = getLightsFromConfig(formattedConfig);

    // const sceneComponents = formatSceneComponentConfigs(
    //   formattedConfig,
    //   materials
    // );

    const sceneProperties = getScenePropertiesFromConfig(
      formattedConfig.scenePropertiesConfig
    );

    return {
      controlsConfig: formattedConfig.controlsConfig ?? {},
      meshes: meshes ?? [],
      // sceneComponents: sceneComponents ?? [],
      lights: lights ?? [],
      sceneProperties,
      animationConfig,
    };
  }, [formattedConfig, assets]);
};
