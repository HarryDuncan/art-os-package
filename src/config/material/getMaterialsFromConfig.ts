import { SceneConfig } from "../../types/config.types";
import { materialConfigToMaterial } from "./materialConfigToMaterial";
import { Material } from "three";
import {
  ASSET_MAPPED_MATERIALS,
  SHADER_MATERIALS,
} from "../../consts/materials/materials.consts";

export const getMaterialsFromConfig = (config: SceneConfig): Material[] => {
  const { sceneMaterialConfigs } = config;
  if (sceneMaterialConfigs) {
    return sceneMaterialConfigs.flatMap((materialConfig) => {
      return !SHADER_MATERIALS.includes(materialConfig.materialType) &&
        !ASSET_MAPPED_MATERIALS.includes(materialConfig.materialType)
        ? materialConfigToMaterial(materialConfig)
        : [];
    });
  }
  return [];
};
