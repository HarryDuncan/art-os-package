import { TransformDefinition } from "../types";
import { FUNCTION_TYPES } from "../consts";

interface UniqueFunction {
  [key: string]: Omit<TransformDefinition, "key">;
}

const mergeShaderFunctions = (
  parsedFunctions: TransformDefinition[]
): TransformDefinition[] => {
  const uniqueFunctions: UniqueFunction = {};
  parsedFunctions.forEach((transformDefinition) => {
    if (!uniqueFunctions[transformDefinition.functionName]) {
      uniqueFunctions[transformDefinition.functionName] = transformDefinition;
    }
  });

  return Object.values(uniqueFunctions);
};

export const functionDeclarations = (
  transformDefinitions: TransformDefinition[]
) => {
  const uniqueFunctions = mergeShaderFunctions(transformDefinitions);
  const orderedFunctions = uniqueFunctions.sort((a, b) => {
    const typeOrder = {
      [FUNCTION_TYPES.STATIC]: 0,
      [FUNCTION_TYPES.SUB_TRANSFORM]: 1,
      [FUNCTION_TYPES.CONFIGURED_STATIC]: 1,
      [FUNCTION_TYPES.FRAGMENT_ROOT]: 4,
      [FUNCTION_TYPES.VERTEX_ROOT]: 5,
      [FUNCTION_TYPES.TRANSFORM]: 6,
    };
    return typeOrder[a.transformType] - typeOrder[b.transformType];
  });

  return orderedFunctions
    .map(({ definitionCode }) => definitionCode.join("\n"))
    .join("\n");
};
