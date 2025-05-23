import { ShaderFunction } from "../../../../../types/materials/index";

interface UniqueFunction {
  [key: string]: { functionDefinition: string; functionType: string };
}
export const mergeShaderFunctions = (
  requiredFunctions: ShaderFunction[][]
): ShaderFunction[] => {
  const allFunctions = requiredFunctions.flatMap(
    (functionArray) => functionArray ?? []
  );
  const uniqueFunctions: UniqueFunction = {};
  allFunctions.forEach(({ id, functionDefinition, functionType }) => {
    if (!uniqueFunctions[id]) {
      uniqueFunctions[id] = { functionDefinition, functionType };
    }
  });

  return Object.keys(uniqueFunctions).map((key) => ({
    id: key,
    functionDefinition: uniqueFunctions[key].functionDefinition,
    functionType: uniqueFunctions[key].functionType,
  }));
};
