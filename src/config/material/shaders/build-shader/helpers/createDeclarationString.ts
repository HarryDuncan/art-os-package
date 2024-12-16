import {
  ShaderPropertyTypes,
  ShaderPropertyValueTypes,
} from "../constants/buildShader.consts";
import { StructConfig } from "../types";

export const createDeclarationString = (
  propertyType: ShaderPropertyTypes,
  valueType: ShaderPropertyValueTypes,
  id: string,
  arrayLength?: number,
  structProperties?: StructConfig
) =>
  `${propertyType.toLowerCase()} ${getValueTypeString(
    valueType,
    structProperties
  )} ${id}${arrayLength ? `[${arrayLength}]` : ""};`;

const getValueTypeString = (
  valueType: ShaderPropertyValueTypes,
  structProperties?: StructConfig
) => {
  switch (valueType) {
    case ShaderPropertyValueTypes.STRUCT:
      if (structProperties) {
        return structProperties.id;
      }
      console.warn("Struct properties not defined");
      return "";
    case ShaderPropertyValueTypes.SAMPLER2D:
      return "sampler2D";
    default:
      return valueType.toLowerCase();
  }
};
