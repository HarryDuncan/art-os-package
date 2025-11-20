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
import { InputMap } from "../../../../../../../types";

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

  const inputParameterMap = getShaderInputMap(parameterMap, inputMapping);
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

export const getShaderInputMap = (
  parameterMap: ShaderParameterMap,
  inputMapping: Record<string, InputMap>
) => {
  const inputKeys = sortInputKeys(Object.keys(inputMapping ?? {}));
  const sortedInputKeys = sortInputKeys(inputKeys);
  const shaderInputMap = new Map<string, ParameterConfig>();
  const parameterArray = Array.from(parameterMap.entries());
  parameterArray.forEach(([key, parameter]) => {
    if (isDefaultParameter(key) && sortedInputKeys.includes(key)) {
      return shaderInputMap.set(key, parameter);
    } else {
      const [_parameterType, parameterName, schemaGuid, parameterGuid] =
        key.split("_");
      if (
        sortedInputKeys.includes(`${parameterName}_${schemaGuid}`) &&
        inputMapping[`${parameterName}_${schemaGuid}`].itemId === parameterGuid
      ) {
        shaderInputMap.set(key, parameter);
      } else {
        console.warn(
          `Input key ${parameterName}_${schemaGuid} not found in inputKeys`
        );
      }
    }
  });

  return shaderInputMap;
};

export const getFunctionInputs = (
  inputMap: ShaderParameterMap,
  shaderEffectId: string
) => {
  const functionInputs =
    Array.from(inputMap.entries())?.flatMap(([id, parameter]) => {
      if (!parameter) return [];
      if (isDefaultParameter(id)) {
        return `${shaderValueTypeInstantiation(
          parameter.valueType
        )} ${id}_${shaderEffectId}`;
      }
      if (!GLOBAL_PARAMETER_TYPES.includes(parameter.parameterType)) {
        const [parameterType, parameterName, schemaGuid] = id.split("_");
        return `${shaderValueTypeInstantiation(
          parameter.valueType
        )} ${parameterType}_${parameterName}_${schemaGuid}_${shaderEffectId}`;
      }
      return [];
    }) ?? [];

  return functionInputs;
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
