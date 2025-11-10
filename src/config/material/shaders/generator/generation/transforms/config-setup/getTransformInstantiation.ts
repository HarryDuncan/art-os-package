import {
  SHADER_VARIABLE_TYPES,
  ShaderTransformationOutputConfig,
} from "../../../../schema";
import { isStruct } from "../../../../utils";
import {
  DEFAULT_SHADER_VARIABLE_KEYS,
  GLOBAL_PARAMETER_TYPES,
  SHADER_VARIABLE_NAME_MAPS,
} from "../../../consts";
import { ShaderParameterMap } from "../../../types";

export const getTransformInstantiation = (
  outputConfig: ShaderTransformationOutputConfig[],
  functionName: string,
  inputMap: ShaderParameterMap,
  shaderEffectId: string

  // todo - assignment config
) => {
  const functionParameters = Array.from(inputMap.entries())?.flatMap(
    ([id, parameter]) => {
      if (!parameter) return [];

      if (!GLOBAL_PARAMETER_TYPES.includes(parameter.parameterType)) {
        if (
          DEFAULT_SHADER_VARIABLE_KEYS[
            id as keyof typeof DEFAULT_SHADER_VARIABLE_KEYS
          ]
        ) {
          return DEFAULT_SHADER_VARIABLE_KEYS[
            id as keyof typeof DEFAULT_SHADER_VARIABLE_KEYS
          ];
        }

        return parameter.key;
      }
      return [];
    }
  );

  const getValueDeclaration = () => {
    return "";
  };

  const getAssignedVariableName = (
    outputConfig: ShaderTransformationOutputConfig[],
    isStructResult: boolean
  ) => {
    if (isStructResult) {
      return `${functionName}_result_struct`;
    }
    const key = getKey(outputConfig[0]);
    return key;
  };

  const isStructResult = isStruct(outputConfig);
  const operator = getOperator(outputConfig, isStructResult);
  const assignedVariableName = getAssignedVariableName(
    outputConfig,
    isStructResult
  );
  return `${getValueDeclaration()} ${assignedVariableName} ${operator} ${functionName}(${functionParameters.join(
    ", "
  )});${postFunctionAssignment(functionName, outputConfig, isStructResult)}`;
};

const getOperator = (
  outputConfig: ShaderTransformationOutputConfig[],
  isStruct: boolean
) => {
  if (isStruct) {
    return `=`;
  } else {
    const { key } = outputConfig[0] ?? {};
    switch (key) {
      case SHADER_VARIABLE_TYPES.LIGHT:
        return "+=";
      case SHADER_VARIABLE_TYPES.DISCARD_COLOR:
        return "*=";
      default:
        return "=";
    }
  }
};

const postFunctionAssignment = (
  functionName: string,
  outputConfig: ShaderTransformationOutputConfig[],
  isStructResult: boolean
) => {
  if (isStructResult) {
    return outputConfig
      .map((output) => {
        return `${getKey(output)} ${getOperator(
          [output],
          false
        )} ${functionName}_result_struct.${output.key};`;
      })
      .join("\n");
  }
  return "";
};

const getKey = (outputConfigItem: ShaderTransformationOutputConfig) => {
  const { key } = outputConfigItem;

  // TODO - remove this we have proper names now
  if (
    SHADER_VARIABLE_NAME_MAPS[key as keyof typeof SHADER_VARIABLE_NAME_MAPS]
  ) {
    return SHADER_VARIABLE_NAME_MAPS[
      key as keyof typeof SHADER_VARIABLE_NAME_MAPS
    ];
  }
  return key;
};
