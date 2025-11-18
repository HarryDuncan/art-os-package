import { ShaderParameterMap } from "./generator/types";
import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_VARIABLE_ASSIGNMENT_MAPS,
} from "./schema";
import {
  OperatorConfig,
  ParameterConfig,
  EffectConfig,
  ShaderTransformationOutputConfig,
} from "./schema/types";

export const getShaderConfigsByType = (
  shaderEffectConfigs: (EffectConfig | OperatorConfig)[],
  shaderType: string
) => {
  return shaderEffectConfigs.filter(
    (shaderEffectConfig) =>
      shaderEffectConfig.type === shaderType && !shaderEffectConfig.disabled
  );
};

export const getFunctionBasedParameters = (
  effectParameters: ParameterConfig[]
) => {
  return effectParameters.filter((parameter) => parameter.isFunctionBased);
};

export const getEffectFunctionConfigs = (
  operatorConfigs: OperatorConfig[],
  effectConfigs: EffectConfig[]
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
  configs: EffectConfig[] | OperatorConfig[],
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

export const isStruct = (outputConfig: ShaderTransformationOutputConfig[]) => {
  return outputConfig.length > 1;
};

export const filterParametersByType = (
  parameterMap: ShaderParameterMap,
  type: string
) =>
  Array.from(parameterMap.entries()).flatMap(([key, parameter]) => {
    if (parameter.parameterType === type) {
      return { ...parameter, key };
    } else {
      return [];
    }
  });

export const findKeyMatch = (
  keyToMatch: string,
  parameterMap: ShaderParameterMap
) => {
  let keyMatch = null;
  for (const key of Array.from(parameterMap.keys())) {
    const [_parameterType, inputParameterName, inputParameterSchemaGuid] =
      key.split("_");
    const [parameterName, schemaGuid] = keyToMatch.split("_");
    if (
      inputParameterName === parameterName &&
      inputParameterSchemaGuid === schemaGuid
    ) {
      keyMatch = key;
    }
  }
  return keyMatch;
};
