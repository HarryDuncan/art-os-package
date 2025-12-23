import { useEffect, useState } from "react";
// import { getLightsFromConfig } from "../config/lights/getLightsFromConfig";
import { formatSceneMaterials } from "../config/material/formatSceneMaterials";
import { getMeshesFromConfig } from "../config/mesh/getMeshesFromConfig";
import { SceneConfig } from "./config.types";
import { Asset } from "../assets/types";
import { postEffectsFromConfig } from "./post-effects/postEffectsFromConfig";
import { ASSET_TYPES } from "../assets/consts";
import { formatSceneProperties } from "./scene-properties/formatSceneProperties";
import { useSceneContext } from "../context/context";

export const useSceneData = (
  config: SceneConfig | undefined | null,
  assets: Asset[]
) => {
  const { setSceneData } = useSceneContext();
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    if (!isInitialized) {
      if (config) {
        const materials = formatSceneMaterials(assets, config);
        const meshes = getMeshesFromConfig(assets, materials, config);
        const postEffects = postEffectsFromConfig(config);
        const overlays =
          config.assets?.filter(
            (asset) => asset.assetType === ASSET_TYPES.OVERLAY
          ) ?? [];

        const sceneProperties = formatSceneProperties(
          config.sceneProperties,
          assets
        );
        setSceneData({
          controlsConfig: config.controlsConfig ?? {},
          meshes: meshes ?? [],
          lights: [],
          sceneProperties,
          postEffects,
          overlays,
        });
        setIsInitialized(true);
      }
    }
  }, [config, assets, isInitialized]);
};
