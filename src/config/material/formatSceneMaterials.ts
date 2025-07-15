/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Asset } from "../../types";
import { SceneConfig } from "../../types/config.types";
import { getMaterialsFromConfig } from "./getMaterialsFromConfig";
// import { getShaderMaterials } from "./shaders/getShaderMaterials";
import { Material } from "three";
import { getAssetMappedMaterials } from "./getAssetMappedMaterials";
import { getBuiltShaderMaterials } from "./shaders/getBuiltShaderMaterials";

export const formatSceneMaterials = (
  assets: Asset[],
  config: SceneConfig
): Material[] => {
  const assetMappedMaterials = getAssetMappedMaterials(
    config?.sceneMaterialConfigs ?? [],
    assets
  );
  const shaderMaterials = []; // getShaderMaterials(config, assets);
  const { builtShaders } = getBuiltShaderMaterials(config, assets);
  const sceneMaterials = getMaterialsFromConfig(config);
  return [
    ...assetMappedMaterials,
    ...shaderMaterials,
    ...(builtShaders ?? []),
    ...sceneMaterials,
  ];
};
