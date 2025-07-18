/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Asset } from "../../types";
import { SceneConfig } from "../config.types";
import { getMaterialsFromConfig } from "./getMaterialsFromConfig";
// import { getShaderMaterials } from "./shaders/getShaderMaterials";
import { Material } from "three";
import { getAssetMappedMaterials } from "./getAssetMappedMaterials";
import { generateShaderMaterials } from "./shaders/generateShaderMaterials";

export const formatSceneMaterials = (
  assets: Asset[],
  config: SceneConfig
): Material[] => {
  const assetMappedMaterials = getAssetMappedMaterials(
    config?.sceneMaterialConfigs ?? [],
    assets
  );
  const shaderMaterials = []; // getShaderMaterials(config, assets);
  const { builtShaders } = generateShaderMaterials(config, assets);
  const sceneMaterials = getMaterialsFromConfig(config);
  return [
    ...assetMappedMaterials,
    ...shaderMaterials,
    ...(builtShaders ?? []),
    ...sceneMaterials,
  ];
};
