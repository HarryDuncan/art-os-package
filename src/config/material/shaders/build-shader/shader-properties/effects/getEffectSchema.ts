import { MeshTransformConfig } from "../../../../../../types";
import {
  ParameterConfig,
  ShaderFunction,
  ShaderTransformationConfig,
} from "../../buildShader.types";
import { FRAGMENT_EFFECT_CONFIG_MAP } from "../../fragment-effects/fragmentEffects.consts";
import { VERTEX_EFFECT_CONFIG_MAP } from "../../vertex-effects/vertexEffects.consts";

export const getShaderEffectSchema = (
  effectType: string,
  shaderType: "VERTEX" | "FRAGMENT"
) => {
  const config =
    shaderType === "VERTEX"
      ? VERTEX_EFFECT_CONFIG_MAP
      : FRAGMENT_EFFECT_CONFIG_MAP;
  const configData = config[effectType];
  if (!configData) {
    return {
      meshTransformConfig: [],
      parameters: [] as ParameterConfig[],
      functions: [] as ShaderFunction[],
      transformationConfig: [] as ShaderTransformationConfig[],
    };
  }
  return {
    meshTransformConfig: (configData?.meshTransformConfig ||
      []) as MeshTransformConfig[],
    parameters: (configData?.parameters || []) as ParameterConfig[],
    functions: (configData?.functions || []) as ShaderFunction[],
    transformationConfig: (configData?.transformationConfig ||
      []) as ShaderTransformationConfig[],
  };
};
