import { ParameterConfig } from "../../buildShader.types";
import { FUNCTION_TYPES, SHADER_VARIABLE_TYPES } from "../../constants";

import { shaderValueTypeInstantiation } from "../safeParseValue";
import { formatEffectCodeLines } from "./formatEffectCode";
import { getAssignedVariableName } from "./functions";
import { FormattedFunctionConfig, FunctionParameter } from "./types";

const getShaderFunctionType = (shaderVariableType: string | undefined) => {
  switch (shaderVariableType) {
    case SHADER_VARIABLE_TYPES.VERTEX_POINT:
    case SHADER_VARIABLE_TYPES.GL_POINT_SIZE:
      return FUNCTION_TYPES.VERTEX_ROOT;
    default:
      return FUNCTION_TYPES.CONFIGURED_STATIC;
  }
};

const setUpFunctionInstantiation = (
  functionName: string,
  functionInstantiationParameterIds: string[]
) => {
  return `${functionName}(${functionInstantiationParameterIds.join(", ")});`;
};

export const formatEffectFunctions = (
  formattedFunctionConfigs: FormattedFunctionConfig[],
  shaderParameters: FunctionParameter[],
  effectParameters: ParameterConfig[]
) =>
  formattedFunctionConfigs.map(
    ({
      returnValue,
      functionName,
      functionParameterIds,
      functionContent,
      shaderVariableType,
      id: functionId,
      functionInstantiationParameterIds,
      dontDeclare,
    }) => {
      const returnTypeString = shaderValueTypeInstantiation(returnValue);
      const functionInputs = functionParameterIds.flatMap((parameterId) => {
        const parameter = shaderParameters.find((p) => p.id === parameterId);
        if (!parameter) {
          return [];
        }
        return `${shaderValueTypeInstantiation(parameter.valueType)} ${
          parameter.functionId
        }`;
      });
      const functionDeclaration = `${returnTypeString} ${functionName}(${functionInputs.join(
        ", "
      )}){`;

      const formattedFunctionContent = formatEffectCodeLines(
        functionContent,
        shaderParameters,
        effectParameters,
        formattedFunctionConfigs
      );

      const assignedVariableName = getAssignedVariableName(shaderVariableType);
      const functionInstantiation = setUpFunctionInstantiation(
        functionName,
        functionInstantiationParameterIds
      );

      const shaderFunctionType = getShaderFunctionType(shaderVariableType);
      const shaderFunctionConfig = {
        id: functionId,
        functionName: functionName,
        assignedVariableName,
        functionInstantiation,
        dontDeclare,
        functionDefinition: [
          functionDeclaration,
          ...formattedFunctionContent,
          `}`,
        ].join("\n"),
        functionType: shaderFunctionType,
      };
      return shaderFunctionConfig;
    }
  );
