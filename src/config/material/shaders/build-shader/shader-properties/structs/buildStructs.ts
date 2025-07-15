import { StructConfig, ShaderPropertyConfig } from "../../buildShader.types";
import { STRUCT_DECLARATION } from "./structs.consts";

export const buildStruct = (config: StructConfig[]): string => {
  const formatted = config.map(({ key, properties }) => {
    const propertyObject = formatPropertyObject(properties);
    return `struct ${key} { \n ${propertyObject} \n };`;
  });
  const structDeclarations = [STRUCT_DECLARATION, ...formatted];
  return structDeclarations.join(" \n ");
};

const formatPropertyObject = (properties: ShaderPropertyConfig[]) =>
  properties
    .map(({ key, valueType }) => `${String(valueType).toLowerCase()} ${key};`)
    .join(" \n ");
