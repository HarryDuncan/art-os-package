import { SHADER_TYPES } from "../../../schema";
import { FUNCTION_TYPES } from "../../consts";

export const getShaderFunctionType = (
  isSubFunction: boolean,
  shaderType: string
) => {
  if (isSubFunction) {
    return FUNCTION_TYPES.CONFIGURED_STATIC;
  }
  return shaderType === SHADER_TYPES.VERTEX
    ? FUNCTION_TYPES.VERTEX_ROOT
    : FUNCTION_TYPES.FRAGMENT_ROOT;
};
