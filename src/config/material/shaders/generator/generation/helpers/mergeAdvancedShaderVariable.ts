import { AdvancedShaderVariableMap } from "../../types";

export const mergeAdvancedShaderVariableMaps = (
  maps: AdvancedShaderVariableMap[]
): AdvancedShaderVariableMap => {
  const merged: AdvancedShaderVariableMap = new Map();
  maps.forEach((map) => {
    Array.from(map.entries()).forEach(([key, variable]) => {
      merged.set(key, variable);
    });
  });
  return merged;
};
