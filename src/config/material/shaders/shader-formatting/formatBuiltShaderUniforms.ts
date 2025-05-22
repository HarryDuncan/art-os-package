import { IUniform, Vector2 } from "three";
import { Asset } from "../../../../types";

import { mapAssetsToUniforms } from "./mapAssetsToUniform";
import {
  UniformConfig,
  UniformObject,
} from "../../../../types/materials/index";

export const formatBuiltShaderUniforms = (
  uniformConfigs: UniformConfig[],
  assets: Asset[]
): { [uniform: string]: IUniform<unknown> } => {
  const assetMapping =
    uniformConfigs.flatMap((uniformConfigs) =>
      uniformConfigs.isAssetMapped && uniformConfigs.assetMappingConfig
        ? { ...uniformConfigs.assetMappingConfig, uniformId: uniformConfigs.id }
        : []
    ) || [];
  const uniforms = {};
  const mappedUniforms = mapAssetsToUniforms(assetMapping, assets, uniforms);
  const formattedUniforms = formatDefaultShaderValues(mappedUniforms);
  return formattedUniforms as { [uniform: string]: IUniform<unknown> };
};

const formatDefaultShaderValues = (uniforms: UniformObject) => {
  if (uniforms.uResolution) {
    uniforms.uResolution = {
      value: new Vector2(window.innerWidth, window.innerHeight).multiplyScalar(
        window.devicePixelRatio
      ),
    };
  }
  return uniforms;
};
