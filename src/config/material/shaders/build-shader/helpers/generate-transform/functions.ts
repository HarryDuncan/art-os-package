import { FUNCTION_TYPES, SHADER_VARIABLE_TYPES } from "../../constants";
import { FRAG_COLOR_NAME } from "../../fragment-effects/fragmentEffects.consts";
import { VERTEX_POINT_NAME } from "../../vertex-effects/vertexEffects.consts";
import { DEFAULT_SHADER_VARIABLE_KEYS } from "./consts";
import { ShaderEffectParameter } from "./types";

export const getShaderVariableKeys = (id: string) => {
  const shaderVariableId =
    DEFAULT_SHADER_VARIABLE_KEYS[
      id as keyof typeof DEFAULT_SHADER_VARIABLE_KEYS
    ];

  return shaderVariableId ?? id;
};

export const getAssignedVariableName = (
  assignedVariableId: string | undefined
) => {
  if (!assignedVariableId) {
    return null;
  }
  switch (assignedVariableId) {
    case SHADER_VARIABLE_TYPES.VERTEX_POINT:
      return VERTEX_POINT_NAME;
    case SHADER_VARIABLE_TYPES.GL_POINT_SIZE:
      return "gl_PointSize";
    case SHADER_VARIABLE_TYPES.FRAGMENT_COLOR:
      return FRAG_COLOR_NAME;
    case SHADER_VARIABLE_TYPES.DISCARD_COLOR:
      return "discardColor";
    default:
      return assignedVariableId;
  }
};

export const shaderSafeGuid = (guid: string) => {
  return guid.slice(0, 8);
};

export const setUpFunctionInstantiation = (
  assignedVariableId: string,
  functionName: string,
  functionParameters: ShaderEffectParameter
) => {
  return `${getAssignedVariableName(
    assignedVariableId
  )} = ${functionName}(${Array.from(functionParameters.values())
    .map(({ id, mappedParameterKey }) => mappedParameterKey ?? id)
    .join(", ")});`;
};

export const getShaderFunctionType = (
  assignedVariableId: string | undefined,
  isSubFunction: boolean
) => {
  switch (assignedVariableId) {
    case SHADER_VARIABLE_TYPES.VERTEX_POINT:
    case SHADER_VARIABLE_TYPES.GL_POINT_SIZE:
      return isSubFunction
        ? FUNCTION_TYPES.VERTEX_SUB_EFFECT
        : FUNCTION_TYPES.VERTEX_ROOT;
    case SHADER_VARIABLE_TYPES.FRAGMENT_COLOR:
      return isSubFunction
        ? FUNCTION_TYPES.FRAGMENT_SUB_EFFECT
        : FUNCTION_TYPES.FRAGMENT_ROOT;
    default:
      return FUNCTION_TYPES.CONFIGURED_STATIC;
  }
};
