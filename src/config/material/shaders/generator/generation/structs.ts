import { StructConfig } from "../../schema";
import { getDefaultValueAsString } from "./helpers/shaderValues";

export const generateStructs = (structsConfigs: StructConfig[] = []) => {
  if (structsConfigs.length === 0) {
    return {
      structDeclaration: "",
      structInstantiation: "",
    };
  }
  const uniqueStructs = structsConfigs.reduce((acc, structConfig) => {
    if (!acc[structConfig.key]) {
      acc[structConfig.key] = structConfig;
    }
    return acc;
  }, {} as Record<string, StructConfig>);

  const structDeclaration = Object.values(uniqueStructs)
    .map(({ key, variables }) => {
      return `struct ${key} {
        ${variables
          .map((variable) => {
            return `${variable.valueType} ${variable.key};`; // TODO - add array length if needed
          })
          .join("\n")}
      };`;
    })
    .join("\n");

  const structInstantiation = Object.values(uniqueStructs)
    .map(({ key }) => {
      return `${key} ${key}_struct;`;
    })
    .join("\n");

  return {
    structDeclaration,
    structInstantiation,
  };
};
