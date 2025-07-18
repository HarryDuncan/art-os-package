import { FUNCTION_TYPES } from "../../consts";
import { ShaderFunction } from "../../types";

export const formatFunctionDeclarations = (functions: ShaderFunction[]) => {
  const orderedFunctions = functions.sort((a, b) => {
    const typeOrder = {
      [FUNCTION_TYPES.STATIC]: 0,
      [FUNCTION_TYPES.CONFIGURED_STATIC]: 1,
      [FUNCTION_TYPES.VERTEX_SUB_EFFECT]: 2,
      [FUNCTION_TYPES.FRAGMENT_SUB_EFFECT]: 3,
      [FUNCTION_TYPES.FRAGMENT_ROOT]: 4,
      [FUNCTION_TYPES.VERTEX_ROOT]: 5,
    };
    return typeOrder[a.functionType] - typeOrder[b.functionType];
  });
  return orderedFunctions
    .map(({ functionDefinition }) => functionDefinition)
    .join("\n");
};
