import { ShaderFunction } from "../../../../../types/materials/index";

interface UniqueFunction {
  [key: string]: string;
}
export const reduceFunctions = (
  requiredFunctions: ShaderFunction[][]
): ShaderFunction[] => {
  const allFunctions = requiredFunctions.flatMap(
    (functionArray) => functionArray ?? []
  );
  const uniqueFunctions: UniqueFunction = {};
  allFunctions.forEach(({ id, functionDefinition }) => {
    if (!uniqueFunctions[id]) {
      uniqueFunctions[id] = functionDefinition;
    }
  });

  return Object.keys(uniqueFunctions).map((key) => ({
    id: key,
    functionDefinition: uniqueFunctions[key],
  }));
};
