import { SHADER_VARIABLE_TYPES } from "../../../schema";
import {
  DEFAULT_SHADER_VARIABLE_KEYS,
  getAssignedVariableName,
  GLOBAL_PARAMETER_TYPES,
} from "../../consts";
import { ShaderParameterMap } from "../../types";

export const functionInstantiation = (
  assignedVariableId: string,
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
  const getOperator = (assignedVariableId: string) => {
    switch (assignedVariableId) {
      case SHADER_VARIABLE_TYPES.LIGHT:
        return "+=";
      default:
        return "=";
    }
  };

  const operator = getOperator(assignedVariableId);
  const assignedVariableName = getAssignedVariableName(assignedVariableId);
  return `${assignedVariableName} ${operator} ${functionName}(${functionParameters.join(
    ", "
  )});`;
};
