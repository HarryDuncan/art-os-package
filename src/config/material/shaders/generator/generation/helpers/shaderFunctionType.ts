import { SHADER_VARIABLE_TYPES } from "../../../schema";
import { FUNCTION_TYPES } from "../../consts";

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
