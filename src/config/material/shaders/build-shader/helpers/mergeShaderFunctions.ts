import { ShaderFunction } from "../../../../../types/materials/index";

interface UniqueFunction {
  [key: string]: Omit<ShaderFunction, "id">;
}
export const mergeShaderFunctions = (
  requiredFunctions: ShaderFunction[][]
): ShaderFunction[] => {
  const allFunctions = requiredFunctions.flatMap(
    (functionArray) => functionArray ?? []
  );
  const uniqueFunctions: UniqueFunction = {};
  allFunctions.forEach(
    ({ id, functionDefinition, functionType, functionName }) => {
      if (!uniqueFunctions[id]) {
        uniqueFunctions[id] = {
          functionDefinition,
          functionType,
          functionName,
        };
      }
    }
  );

  return Object.keys(uniqueFunctions).map((key) => ({
    ...uniqueFunctions[key],
    id: key,
  }));
};
