import { StructConfig } from "../../schema";

export const generateStructs = (structsConfigs: StructConfig[] = []) => {
  if (structsConfigs.length === 0) {
    return [];
  }
  return structsConfigs.map((structConfig) => {
    return `struct ${structConfig.key} {
      ${structConfig.variables
        .map((variable) => {
          return `${variable.valueType} ${variable.key};`; // TODO - add array length if needed
        })
        .join("\n")}
    };`;
  });
};
