import { ShaderFunction } from "../buildShader.types";
import { FUNCTION_TYPES } from "../constants";

export const formatFunctionDeclarations = (functions: ShaderFunction[]) => {
  const orderedFunctions = functions.sort((a, b) => {
    const typeOrder = {
      [FUNCTION_TYPES.STATIC]: 0,
      [FUNCTION_TYPES.SUB_EFFECT]: 1,
      [FUNCTION_TYPES.ROOT]: 2,
    };
    return typeOrder[a.functionType] - typeOrder[b.functionType];
  });
  return orderedFunctions
    .map(({ functionDefinition }) => functionDefinition)
    .join("\n");
};
