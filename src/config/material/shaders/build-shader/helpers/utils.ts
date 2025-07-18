import {
  OperatorConfig,
  ParameterConfig,
  ShaderEffectConfig,
} from "../buildShader.types";

export const getShaderConfigsByType = (
  shaderEffectConfigs: ShaderEffectConfig[],
  shaderType: string
) => {
  return shaderEffectConfigs.filter(
    (shaderEffectConfig) => shaderEffectConfig.shaderType === shaderType
  );
};

export const getFunctionBasedParameters = (
  effectParameters: ParameterConfig[]
) => {
  return effectParameters.filter((parameter) => parameter.isFunctionBased);
};

export const getEffectFunctionConfigs = (
  operatorConfigs: OperatorConfig[],
  effectConfigs: ShaderEffectConfig[]
) =>
  operatorConfigs.filter((config) => {
    const { outputMapping } = config;
    const outputIds = Object.values(outputMapping).map(
      (mapping) => mapping.itemId
    );
    return outputIds.some((id) =>
      effectConfigs.some((config) => config.guid === id)
    );
  });

export const getEffectConfigUsingParameters = (
  configs: ShaderEffectConfig[] | OperatorConfig[],
  parameters: ParameterConfig[]
) => {
  return configs.filter((config) => {
    const { inputMapping } = config;
    const inputIds = Object.values(inputMapping).map(
      (mapping) => mapping.itemId
    );
    return parameters.some((parameter) => inputIds.includes(parameter.guid));
  });
};
