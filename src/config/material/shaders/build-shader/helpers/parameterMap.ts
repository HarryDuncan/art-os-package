import {
  OutputInputMapping,
  ShaderEffectConfig,
  ShaderParameter,
  ShaderParameterMap,
} from "../buildShader.types";
import { SHADER_PROPERTY_TYPES } from "../constants/shader.consts";
import { DEFAULT_PARAMETER_KEYS } from "./generate-transform/consts";

export const getParametersByKey = (
  parameterMap: ShaderParameterMap,
  key: string[]
) => {
  const parameterArray = Array.from(parameterMap.values());
  return parameterArray.filter((parameter) => key.includes(parameter.id));
};

export const getShaderInputMap = (
  parameterMap: ShaderParameterMap,
  inputIds: string[],
  shaderEffectConfig: ShaderEffectConfig
) => {
  const shaderInputMap = new Map<string, ShaderParameter>();
  const parameters = getParametersByKey(parameterMap, inputIds);
  const { inputMapping, id } = shaderEffectConfig;
  parameters.forEach((parameter) => {
    if (DEFAULT_PARAMETER_KEYS.includes(parameter.id)) {
      shaderInputMap.set(parameter.id, {
        ...parameter,
        shaderParameterId: `${parameter.id}_${id}`,
      });
      return;
    }
    if (parameter.parameterType === SHADER_PROPERTY_TYPES.ATTRIBUTE) {
      shaderInputMap.set(parameter.id, parameter);
      return;
    }
    if (parameter.parameterType === SHADER_PROPERTY_TYPES.VARYING) {
      shaderInputMap.set(`${parameter.id.replace("_varying", "")}`, parameter);
      return;
    }

    const itemId = inputMapping?.[parameter.id]?.itemId;
    if (itemId === parameter.guid) {
      shaderInputMap.set(`${parameter.id}`, parameter);
      return;
    }
  });

  return shaderInputMap;
};

export const getInputIds = (
  transformCode: string[],
  inputMapping: Record<string, OutputInputMapping>,
  isFragment: boolean
) => {
  const keys: string[] = [];

  transformCode.forEach((line) => {
    const matches = line.matchAll(/{{(\w+)}}/g);
    for (const match of matches) {
      const key = match[1];
      if (DEFAULT_PARAMETER_KEYS.includes(key)) {
        keys.push(key);
      } else if (inputMapping?.[key]) {
        keys.push(key);
      } else if (isFragment) {
        const varyingKey = `${key}_varying`;
        if (inputMapping?.[varyingKey]) {
          keys.push(varyingKey);
        }
      }
    }
  });
  return Array.from(new Set(keys));
};

export const getParametersFromInputMapping = (
  inputMapping: Record<string, OutputInputMapping>,
  parameterMap: ShaderParameterMap
) => {
  const inputIds = Object.keys(inputMapping);
  const parameters = getParametersByKey(parameterMap, inputIds);
  return parameters.flatMap((parameter) => {
    const itemId = inputMapping?.[parameter.id]?.itemId;
    if (itemId === parameter.guid) {
      return parameter;
    }
    return [];
  });
};

export const sortInputIds = (inputIds: string[]) => {
  const allInputIds = Array.from(new Set([...inputIds]));
  const defaultInputIds = allInputIds
    .filter((key) => DEFAULT_PARAMETER_KEYS.includes(key))
    .sort((a, b) => a.localeCompare(b));
  const nonDefaultInputIds = allInputIds
    .filter((key) => !DEFAULT_PARAMETER_KEYS.includes(key))
    .sort((a, b) => a.localeCompare(b));
  const sortedInputIds = [...defaultInputIds, ...nonDefaultInputIds];
  return sortedInputIds;
};
