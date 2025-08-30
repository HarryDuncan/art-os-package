import { useEffect, useState } from "react";
// import { getLightsFromConfig } from "../config/lights/getLightsFromConfig";
import { formatSceneMaterials } from "../config/material/formatSceneMaterials";
import { getMeshesFromConfig } from "../config/mesh/getMeshesFromConfig";
import { SceneConfig, SceneData } from "./config.types";
import { getScenePropertiesFromConfig } from "./scene-properties/setSceneProperties";
import { Asset } from "../assets/types";
import { postEffectsFromConfig } from "./post-effects/postEffectsFromConfig";
import { ASSET_TYPES } from "../assets/consts";

export const useSceneData = (
  config: SceneConfig | undefined | null,
  assets: Asset[]
): SceneData | null => {
  const [sceneData, setSceneData] = useState<SceneData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      if (config) {
        const materials = formatSceneMaterials(assets, config);
        const meshes = getMeshesFromConfig(assets, materials, config);
        const animationConfig = config?.animationConfig ?? [];
        const sceneProperties = getScenePropertiesFromConfig(
          config.scenePropertiesConfig
        );
        const postEffects = postEffectsFromConfig(config);
        const overlays =
          config.assets?.filter(
            (asset) => asset.assetType === ASSET_TYPES.OVERLAY
          ) ?? [];
        setSceneData({
          controlsConfig: config.controlsConfig ?? {},
          meshes: meshes ?? [],
          lights: [],
          sceneProperties,
          animationConfig,
          postEffects,
          overlays,
        });
        setIsInitialized(true);
      }
    }
  }, [config, assets, isInitialized]);

  return sceneData;
};
