import { SHADER_TYPES } from "../../../schema";
import { FUNCTION_TYPES } from "../../consts";

export const getShaderFunctionType = (isRoot: boolean, shaderType: string) => {
  if (isRoot) {
    return shaderType === SHADER_TYPES.VERTEX
      ? FUNCTION_TYPES.VERTEX_ROOT
      : FUNCTION_TYPES.FRAGMENT_ROOT;
  }
  return FUNCTION_TYPES.CONFIGURED_STATIC;
};
