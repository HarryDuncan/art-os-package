/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Asset } from "../../types";
import { SceneConfig } from "../../types/config.types";
import { getMaterialsFromConfig } from "./getMaterialsFromConfig";
// import { getShaderMaterials } from "./shaders/getShaderMaterials";
import { Material } from "three";
import { getAssetMappedMaterials } from "./getAssetMappedMaterials";
import { getBuiltShaderMaterials } from "./shaders/getBuiltShaderMaterials";
import { ShaderAttributeConfig } from "./shaders/build-shader/types";

export const formatSceneMaterials = (
  assets: Asset[],
  config: SceneConfig
): { materials: Material[]; attributeConfigs: ShaderAttributeConfig[] } => {
  const assetMappedMaterials = getAssetMappedMaterials(
    config?.sceneMaterialConfigs ?? [],
    assets
  );
  const shaderMaterials = []; // getShaderMaterials(config, assets);
  const { builtShaders, attributeConfigs } = getBuiltShaderMaterials(
    config,
    assets
  );
  const sceneMaterials = getMaterialsFromConfig(config);
  return {
    materials: [
      ...assetMappedMaterials,
      ...shaderMaterials,
      ...(builtShaders ?? []),
      ...sceneMaterials,
    ],
    attributeConfigs,
  };
};
