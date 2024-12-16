import { IUniform, Vector2 } from "three";
import { mapAssetsToUniforms } from "display/materials/webgl-shaders/shader-setup/mapAssetsToUniforms";
import { AssetMap } from "display/materials/webgl-shaders/shaders.types";
import { Asset } from "assets/asset.types";
import { UniformObject } from "../build-shader/types";

export const formatBuiltShaderUniforms = (
  uniforms: UniformObject,
  assetMapping: AssetMap[],
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
