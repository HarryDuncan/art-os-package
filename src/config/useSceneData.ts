/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { formatSceneComponentConfigs } from "../config/components/formatSceneComponentConfigs";
import { getLightsFromConfig } from "../config/lights/getLightsFromConfig";
import { formatSceneMaterials } from "../config/material/formatSceneMaterials";
import { getMeshesFromConfig } from "../config/mesh/getMeshesFromConfig";
import { SceneConfig, SceneData } from "../types/config.types";
import { Asset } from "../types";
import { getScenePropertiesFromConfig } from "./scene-properties/setSceneProperties";
import { useThreeJsFromConfig } from "./three-js/useThreeJsFromConfig";
import { useMemo } from "react";
import { useScreenSizeProperties } from "./scene-properties/useScreenSizeProperties";
import { useWindowState } from "../compat/window-state/windowStateProvider";
import { useInitializeVideos } from "../assets/animated-texture/useInitializeVideos";

export const useSceneData = (
  config: SceneConfig | undefined | null,
  assets: Asset[],
  areAssetsInitialized: boolean
): SceneData | null => {
  useInitializeVideos(assets, areAssetsInitialized);
  const setUpThreeJs = useThreeJsFromConfig(config);
  const {
    state: { screenType },
  } = useWindowState();
  const formattedConfig = useScreenSizeProperties(config, screenType);
  return useMemo(() => {
    if (!areAssetsInitialized || !formattedConfig) return null;
    const threeJsParams = setUpThreeJs(formattedConfig.threeJsConfig);
    const { materials, attributeConfigs } = formatSceneMaterials(
      assets,
      formattedConfig
    );
    const meshes = getMeshesFromConfig(
      assets,
      materials,
      formattedConfig,
      attributeConfigs
    );

    const animationConfig = config?.animationConfig ?? [];

    const lights = getLightsFromConfig(formattedConfig);

    const sceneComponents = formatSceneComponentConfigs(
      formattedConfig,
      materials
    );

    const sceneProperties = getScenePropertiesFromConfig(
      formattedConfig.scenePropertiesConfig
    );

    return {
      threeJsParams,
      meshes: meshes ?? [],
      sceneComponents: sceneComponents ?? [],
      lights: lights ?? [],
      sceneProperties,
      animationConfig,
    };
  }, [setUpThreeJs, formattedConfig, assets, areAssetsInitialized]);
};
