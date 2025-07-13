import { DefinedEffectFunction, ShaderFunction } from "../buildShader.types";

interface UniqueFunction {
  [key: string]: Omit<ShaderFunction, "id">;
}
export const mergeShaderFunctions = (
  requiredFunctions: (ShaderFunction | DefinedEffectFunction)[][]
): ShaderFunction[] => {
  const allFunctions = requiredFunctions.flatMap(
    (functionArray) => functionArray ?? []
  );
  const uniqueFunctions: UniqueFunction = {};
  allFunctions.forEach(({ id, ...rest }) => {
    if (!uniqueFunctions[id]) {
      uniqueFunctions[id] = {
        ...rest,
      };
    }
  });

  return Object.keys(uniqueFunctions).map((key) => ({
    ...uniqueFunctions[key],
    id: key,
  }));
};
