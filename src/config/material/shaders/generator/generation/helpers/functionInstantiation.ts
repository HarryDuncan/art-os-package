import {
  SHADER_VARIABLE_TYPES,
  ShaderTransformationOutputConfig,
} from "../../../schema";
import { isStruct } from "../../../utils";
import {
  DEFAULT_SHADER_VARIABLE_KEYS,
  GLOBAL_PARAMETER_TYPES,
  SHADER_VARIABLE_NAME_MAPS,
} from "../../consts";
import { ShaderParameterMap } from "../../types";

export const functionInstantiation = (
  outputConfig: ShaderTransformationOutputConfig[],
  functionName: string,
  inputMap: ShaderParameterMap,
  shaderEffectId: string
) => {
  const functionParameters = Array.from(inputMap.entries())?.flatMap(
    ([id, parameter]) => {
      if (!parameter) return [];

      if (!GLOBAL_PARAMETER_TYPES.includes(parameter.parameterType)) {
        if (parameter.shaderVariableConfig?.mappedVariableId) {
          return parameter.shaderVariableConfig.mappedVariableId;
        }
        if (
          DEFAULT_SHADER_VARIABLE_KEYS[
            id as keyof typeof DEFAULT_SHADER_VARIABLE_KEYS
          ]
        ) {
          return DEFAULT_SHADER_VARIABLE_KEYS[
            id as keyof typeof DEFAULT_SHADER_VARIABLE_KEYS
          ];
        }
        const parameterKey =
          parameter.mappedParameterKey ??
          parameter.shaderParameterId ??
          `${id}_${shaderEffectId}`;

        return parameterKey;
      }
      return [];
    }
  );
  const getOperator = (outputConfig: ShaderTransformationOutputConfig[]) => {
    // switch (assignedVariableId) {
    //   case SHADER_VARIABLE_TYPES.LIGHT:
    //   case SHADER_VARIABLE_TYPES.DISCARD_COLOR:
    //     return "+=";
    //   default:
    //     return "=";
    // }
    if (isStruct(outputConfig)) {
      // return outputConfig.map((output) => output.key).join(", ");
      return "test";
      //todo - return a struct declaration
    } else {
      const { key } = outputConfig[0] ?? {};
      switch (key) {
        case SHADER_VARIABLE_TYPES.LIGHT:
          return "+=";
        case SHADER_VARIABLE_TYPES.DISCARD_COLOR:
          return "+=";
        default:
          return "=";
      }
    }
  };

  const getAssignedVariableName = (
    outputConfig: ShaderTransformationOutputConfig[]
  ) => {
    if (isStruct(outputConfig)) {
      // return outputConfig.map((output) => output.key).join(", ");
      return "test";
      //todo - return a struct declaration
    }
    const { key } = outputConfig[0];
    if (
      SHADER_VARIABLE_NAME_MAPS[key as keyof typeof SHADER_VARIABLE_NAME_MAPS]
    ) {
      return SHADER_VARIABLE_NAME_MAPS[
        key as keyof typeof SHADER_VARIABLE_NAME_MAPS
      ];
    }
    return key;
  };

  const operator = getOperator(outputConfig);
  const assignedVariableName = getAssignedVariableName(outputConfig);
  return `${assignedVariableName} ${operator} ${functionName}(${functionParameters.join(
    ", "
  )});`;
};
