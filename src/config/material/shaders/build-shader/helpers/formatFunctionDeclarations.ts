import { ShaderFunction } from "../buildShader.types";
import { FUNCTION_TYPES } from "../constants";

export const formatFunctionDeclarations = (functions: ShaderFunction[]) => {
  const orderedFunctions = functions.sort((a, b) => {
    const typeOrder = {
      [FUNCTION_TYPES.VERTEX_ROOT]: 1,
      [FUNCTION_TYPES.VERTEX_SUB_EFFECT]: 2,
      [FUNCTION_TYPES.FRAGMENT_ROOT]: 3,
      [FUNCTION_TYPES.FRAGMENT_SUB_EFFECT]: 4,
      [FUNCTION_TYPES.CONFIGURED_STATIC]: 5,
      [FUNCTION_TYPES.STATIC]: 6,
    };
    return typeOrder[a.functionType] - typeOrder[b.functionType];
  });
  return orderedFunctions
    .map(({ functionDefinition }) => functionDefinition)
    .join("\n");
};
