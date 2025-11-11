import { ShaderParameterMap } from "../../../types";
import {
  EffectConfig,
  ParameterConfig,
  ShaderTransformationOutputConfig,
  ShaderTransformationParameterConfig,
  ShaderTransformationSchema,
} from "../../../../schema";
import { GLOBAL_PARAMETER_TYPES } from "../../../consts";
import { isDefaultParameter } from "../../helpers/parameterUtils";
import { shaderValueTypeInstantiation } from "../../helpers/shaderValues";
import { isStruct } from "../../../../utils";

export const getTransformInputs = (
  transformConfig: ShaderTransformationSchema,
  parameterMap: ShaderParameterMap,
  effectConfig: EffectConfig
) => {
  const {
    isSubFunction,
    parameters,
    key: functionName,
    outputConfig,
  } = transformConfig;
  const { inputMapping, guid } = effectConfig;
  const inputKeys = Object.keys(inputMapping ?? {});
  const sortedInputKeys = sortInputKeys(inputKeys);
  const inputParameterMap = getShaderInputMap(parameterMap, sortedInputKeys);

  const transformInputs = isSubFunction
    ? getSubFunctionInputs(parameters)
    : getFunctionInputs(inputParameterMap, guid);

  const transformDeclaration = createTransformDeclaration(
    functionName,
    transformInputs,
    outputConfig
  );
  return { transformDeclaration, transformInputs, inputParameterMap };
};

const sortInputKeys = (inputKeys: string[]) => {
  const allInputKeys = Array.from(new Set([...inputKeys]));
  const defaultInputKeys = allInputKeys
    .filter((key) => isDefaultParameter(key))
    .sort((a, b) => a.localeCompare(b));
  const nonDefaultInputKeys = allInputKeys
    .filter((key) => !isDefaultParameter(key))
    .sort((a, b) => a.localeCompare(b));
  const sortedInputKeys = [...defaultInputKeys, ...nonDefaultInputKeys];
  return sortedInputKeys;
};

export const getParametersByKey = (
  parameterMap: ShaderParameterMap,
  keys: string[]
) => {
  const parameterArray = Array.from(parameterMap.entries());
  const parameters = parameterArray.flatMap(([key, parameter]) => {
    if (keys.includes(key)) {
      return parameter;
    }
    return [];
  });
  return parameters;
};

export const getShaderInputMap = (
  parameterMap: ShaderParameterMap,
  inputKeys: string[]
) => {
  const shaderInputMap = new Map<string, ParameterConfig>();

  const parameters = getParametersByKey(parameterMap, inputKeys);

  parameters.forEach((parameter) => {
    shaderInputMap.set(parameter.key, parameter);
    return;
  });
  return shaderInputMap;
};

export const getFunctionInputs = (
  inputMap: ShaderParameterMap,
  shaderEffectId: string
) => {
  const defaultInputs =
    Array.from(inputMap.entries())?.flatMap(([id, parameter]) => {
      if (!parameter) return [];
      if (!GLOBAL_PARAMETER_TYPES.includes(parameter.parameterType)) {
        return `${shaderValueTypeInstantiation(
          parameter.valueType
        )} ${id}_${shaderEffectId}`;
      }
      return [];
    }) ?? [];

  return defaultInputs;
};

const getSubFunctionInputs = (
  parameters: ShaderTransformationParameterConfig[]
) => {
  return parameters.map(
    (parameter) => `${parameter.valueType} ${parameter.key}`
  );
};

const createTransformDeclaration = (
  functionName: string,
  functionInputs: string[],
  outputConfig: ShaderTransformationOutputConfig[]
) => {
  if (isStruct(outputConfig)) {
    return `${functionName}_result ${functionName}(${functionInputs.join(
      ", "
    )}){`;
  }
  return `${outputConfig[0].valueType} ${functionName}(${functionInputs.join(
    ", "
  )}){`;
};
