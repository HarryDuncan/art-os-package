import { SHADER_VARIABLE_TYPES } from "../../constants";
import { FRAG_COLOR_NAME } from "../../fragment-effects/fragmentEffects.consts";
import { VERTEX_POINT_NAME } from "../../vertex-effects/vertexEffects.consts";

export const getAssignedVariableName = (
  shaderVariableType: string | undefined
) => {
  switch (shaderVariableType) {
    case SHADER_VARIABLE_TYPES.VERTEX_POINT:
      return VERTEX_POINT_NAME;
    case SHADER_VARIABLE_TYPES.GL_POINT_SIZE:
      return "gl_PointSize";
    case SHADER_VARIABLE_TYPES.FRAGMENT_COLOR:
      return FRAG_COLOR_NAME;
    case SHADER_VARIABLE_TYPES.DISCARD_COLOR:
      return "discardColor";
    default:
      return null;
  }
};
