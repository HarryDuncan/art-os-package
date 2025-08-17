import { useEffect, useState } from "react";
// import { getLightsFromConfig } from "../config/lights/getLightsFromConfig";
import { formatSceneMaterials } from "../config/material/formatSceneMaterials";
import { getMeshesFromConfig } from "../config/mesh/getMeshesFromConfig";
import { SceneConfig, SceneData } from "./config.types";
import { getScenePropertiesFromConfig } from "./scene-properties/setSceneProperties";
import { Asset } from "../assets/types";

export const useSceneData = (
  config: SceneConfig | undefined | null,
  assets: Asset[]
): SceneData | null => {
  const [sceneData, setSceneData] = useState<SceneData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      if (!config) return null;
      const materials = formatSceneMaterials(assets, config);
      const meshes = getMeshesFromConfig(assets, materials, config);

      const animationConfig = config?.animationConfig ?? [];

      const sceneProperties = getScenePropertiesFromConfig(
        config.scenePropertiesConfig
      );

      setSceneData({
        controlsConfig: config.controlsConfig ?? {},
        meshes: meshes ?? [],
        lights: [],
        sceneProperties,
        animationConfig,
      });
      setIsInitialized(true);
    }
  }, [config, assets, isInitialized]);

  return sceneData;
};
