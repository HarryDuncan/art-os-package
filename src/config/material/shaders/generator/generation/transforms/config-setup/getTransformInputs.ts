import { ShaderParameter, ShaderParameterMap } from "../../../types";
import {
  EffectConfig,
  OutputInputMapping,
  SHADER_PROPERTY_TYPES,
  ShaderTransformationOutputConfig,
  ShaderTransformationParameterConfig,
  ShaderTransformationSchema,
} from "../../../../schema";
import {
  DEFAULT_PARAMETER_KEYS,
  GLOBAL_PARAMETER_TYPES,
} from "../../../consts";
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
  const inputParameterMap = getShaderInputMap(
    parameterMap,
    sortedInputKeys,
    effectConfig
  );
  console.log(inputKeys);
  console.log("inputParameterMap", inputParameterMap);

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
    .filter((key) => DEFAULT_PARAMETER_KEYS.includes(key))
    .sort((a, b) => a.localeCompare(b));
  const nonDefaultInputKeys = allInputKeys
    .filter((key) => !DEFAULT_PARAMETER_KEYS.includes(key))
    .sort((a, b) => a.localeCompare(b));
  const sortedInputKeys = [...defaultInputKeys, ...nonDefaultInputKeys];
  return sortedInputKeys;
};

export const getParametersByKey = (
  parameterMap: ShaderParameterMap,
  keys: string[],
  inputMapping?: Record<string, OutputInputMapping>
) => {
  const parameterArray = Array.from(parameterMap.entries());
  const parameters = parameterArray.flatMap(([key, parameter]) => {
    const [keyWithoutEffectId, parameterGuid] = key.split("_");
    if (
      keys.includes(keyWithoutEffectId) &&
      isDefaultParameter(keyWithoutEffectId)
    ) {
      return parameter;
    }

    if (
      inputMapping?.[keyWithoutEffectId] &&
      inputMapping?.[keyWithoutEffectId]?.itemId === parameterGuid &&
      keys.includes(keyWithoutEffectId)
    ) {
      return parameter;
    } else if (keys.includes(keyWithoutEffectId) && !parameterGuid) {
      return parameter;
    }
    return [];
  });

  const uniqueParameters = new Map<string, ShaderParameter>();
  parameters.forEach((parameter) => {
    const existingParameter = uniqueParameters.get(parameter.key);
    if (existingParameter) {
      const splitParameter = parameter.shaderParameterId.split("_");
      if (splitParameter.length === 2) {
        uniqueParameters.set(parameter.key, { ...parameter, isDefault: true });
      }
    } else {
      uniqueParameters.set(parameter.key, parameter);
    }
  });
  return Array.from(uniqueParameters.values());
};

export const getShaderInputMap = (
  parameterMap: ShaderParameterMap,
  inputKeys: string[],
  shaderEffectConfig: EffectConfig
) => {
  const shaderInputMap = new Map<string, ShaderParameter>();
  const { inputMapping, guid: effectId } = shaderEffectConfig;
  const parameters = getParametersByKey(parameterMap, inputKeys, inputMapping);

  parameters.forEach((parameter) => {
    if (
      parameter.parameterType === SHADER_PROPERTY_TYPES.ATTRIBUTE ||
      parameter.key === "uTime"
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
      console.log("setting default parameter", parameter.key);
      shaderInputMap.set(parameter.key, {
        ...parameter,
        shaderParameterId: `${parameter.key}_${effectId}`,
      });
      return;
    }
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
