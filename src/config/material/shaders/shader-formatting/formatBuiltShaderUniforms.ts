import { IUniform, Vector2 } from "three";
import { Asset } from "../../../../types";
import { UniformObject } from "../build-shader/types";
import { AssetToUniformMappingConfig } from "../../../../config/material/materials.types";
import { mapAssetsToUniforms } from "./mapAssetsToUniform";

export const formatBuiltShaderUniforms = (
  uniforms: UniformObject,
  assetMapping: AssetToUniformMappingConfig[],
  assets: Asset[]
): { [uniform: string]: IUniform<unknown> } => {
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
