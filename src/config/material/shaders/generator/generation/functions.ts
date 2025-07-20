import { DefinedEffectFunction, ShaderFunction } from "../types";
import { FUNCTION_TYPES } from "../consts";

interface UniqueFunction {
  [key: string]: Omit<ShaderFunction, "key">;
}

const mergeShaderFunctions = (
  parsedFunctions: (ShaderFunction | DefinedEffectFunction)[]
): ShaderFunction[] => {
  const uniqueFunctions: UniqueFunction = {};
  parsedFunctions.forEach(({ key, ...rest }) => {
    if (!uniqueFunctions[key]) {
      uniqueFunctions[key] = {
        ...rest,
      };
    }
  });

  return Object.keys(uniqueFunctions).map((key) => ({
    ...uniqueFunctions[key],
    key: key,
  }));
};

export const functionDeclarations = (functions: ShaderFunction[]) => {
  const uniqueFunctions = mergeShaderFunctions(functions);
  const orderedFunctions = uniqueFunctions.sort((a, b) => {
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
