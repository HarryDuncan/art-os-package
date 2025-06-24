import { IUniform, Vector2 } from "three";
import { Asset } from "../../../../types";
import { mapAssetsToUniforms } from "./mapAssetsToUniform";
import {
  ParameterConfig,
  UniformObject,
} from "../../../../types/materials/index";

export const formatBuiltShaderUniforms = (
  uniformConfigs: ParameterConfig[],
  assets: Asset[]
): { [uniform: string]: IUniform<unknown> } => {
  const uniformParameters = uniformConfigs.filter(
    (uniform) => uniform.isUniform
  );

  const assetMapping =
    uniformParameters.flatMap((uniformConfigs) =>
      uniformConfigs.isAssetMapped && uniformConfigs.assetMappingConfig
        ? { ...uniformConfigs.assetMappingConfig, uniformId: uniformConfigs.id }
        : []
    ) || [];

  const uniforms = uniformParameters.reduce((acc, uniform) => {
    acc[uniform.id] = { value: uniform.value };
    return acc;
  }, {} as UniformObject);
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
