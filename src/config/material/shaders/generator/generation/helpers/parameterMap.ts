import {
  OutputInputMapping,
  SHADER_PROPERTY_TYPES,
  ShaderEffectConfig,
} from "../../../schema";
import { DEFAULT_PARAMETER_KEYS, GLOBAL_PARAMETER_TYPES } from "../../consts";
import { ShaderParameter, ShaderParameterMap } from "../../types";
import { shaderValueTypeInstantiation } from "./shaderValues";

export const getParametersByKey = (
  parameterMap: ShaderParameterMap,
  key: string[]
) => {
  const parameterArray = Array.from(parameterMap.values());
  return parameterArray.filter((parameter) => key.includes(parameter.key));
};

export const getShaderInputMap = (
  parameterMap: ShaderParameterMap,
  inputIds: string[],
  shaderEffectConfig: ShaderEffectConfig
) => {
  const shaderInputMap = new Map<string, ShaderParameter>();
  const parameters = getParametersByKey(parameterMap, inputIds);
  const { inputMapping, guid: effectId } = shaderEffectConfig;
  parameters.forEach((parameter) => {
    if (
      parameter.parameterType === SHADER_PROPERTY_TYPES.ATTRIBUTE ||
      parameter.key === "uTime" ||
      parameter.key === "fragColor"
    ) {
      shaderInputMap.set(parameter.key, parameter);
      return;
    }
    if (parameter.parameterType === SHADER_PROPERTY_TYPES.VARYING) {
      shaderInputMap.set(`${parameter.key.replace("_varying", "")}`, parameter);
      return;
    }

    const itemId = inputMapping?.[parameter.key]?.itemId;

    if (itemId === parameter.guid) {
      shaderInputMap.set(`${parameter.key}`, parameter);
      return;
    } else if (
      DEFAULT_PARAMETER_KEYS.includes(parameter.key) &&
      !parameter.guid
    ) {
      shaderInputMap.set(parameter.key, {
        ...parameter,
        shaderParameterId: `${parameter.key}_${effectId}`,
      });
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
    const itemId = inputMapping?.[parameter.key]?.itemId;
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

export const getFunctionInputs = (
  inputMap: ShaderParameterMap,
  shaderEffectId: string,
  withValueType: boolean = true
) => {
  const defaultInputs =
    Array.from(inputMap.entries())?.flatMap(([id, parameter]) => {
      if (!parameter) return [];
      if (!GLOBAL_PARAMETER_TYPES.includes(parameter.parameterType)) {
        if (withValueType) {
          return `${shaderValueTypeInstantiation(
            parameter.valueType
          )} ${id}_${shaderEffectId}`;
        }
        return `${id}_${shaderEffectId}`;
      }
      return [];
    }) ?? [];

  return defaultInputs;
};
