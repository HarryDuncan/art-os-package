import {
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_VARIABLE_ASSIGNMENT_MAPS,
} from "./schema";
import {
  OperatorConfig,
  ParameterConfig,
  ShaderEffectConfig,
} from "./schema/types";

export const getShaderConfigsByType = (
  shaderEffectConfigs: ShaderEffectConfig[],
  shaderType: string
) => {
  return shaderEffectConfigs.filter(
    (shaderEffectConfig) =>
      shaderEffectConfig.shaderType === shaderType &&
      !shaderEffectConfig.disabled
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

export const getDefaultShaderVariableValueType = (
  key: string
): keyof typeof SHADER_PROPERTY_VALUE_TYPES => {
  const parameters = Object.values(SHADER_VARIABLE_ASSIGNMENT_MAPS).flatMap(
    (assignmentMap) =>
      Object.entries(assignmentMap).map(([assignmentKey, valueType]) => ({
        key: assignmentKey,
        valueType: valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
      }))
  );
  return parameters.find((parameter) => parameter.key === key)
    ?.valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES;
};
