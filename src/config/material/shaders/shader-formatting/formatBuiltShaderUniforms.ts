import { IUniform, Vector2 } from "three";
import { Asset } from "../../../../types";
import { mapAssetsToUniforms } from "./mapAssetsToUniform";
import {
  DEFAULT_UNIFORM_IDS,
  SHADER_PROPERTY_TYPES,
} from "../build-shader/constants/shader.consts";
import {
  UniformObject,
  ParameterConfig,
} from "../build-shader/buildShader.types";

export const formatBuiltShaderUniforms = (
  uniformConfigs: ParameterConfig[],
  assets: Asset[]
): { [uniform: string]: IUniform<unknown> } => {
  const uniformParameters = uniformConfigs.filter(
    (uniform) => uniform.parameterType === SHADER_PROPERTY_TYPES.UNIFORM
  );
  const assetMapping =
    uniformParameters.flatMap((uniformConfigs) =>
      uniformConfigs.isAssetMapped && uniformConfigs.assetMappingConfig
        ? {
            ...uniformConfigs.assetMappingConfig,
            uniformId: `${uniformConfigs.id}_${uniformConfigs.guid}`,
          }
        : []
    ) || [];

  const uniforms = uniformParameters.reduce((acc, uniform) => {
    if (DEFAULT_UNIFORM_IDS.includes(uniform.id)) {
      acc[uniform.id] = { value: uniform.value };
      return acc;
    }
    acc[`${uniform.id}_${uniform.guid}`] = { value: uniform.value };
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
