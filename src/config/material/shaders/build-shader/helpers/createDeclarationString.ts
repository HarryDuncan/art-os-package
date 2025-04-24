import { StructConfig } from "../../../../../types/materials/shaders/buildShader.types";
import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../../../consts/materials/shader.consts";

export const createDeclarationString = (
  propertyType: keyof typeof SHADER_PROPERTY_TYPES,
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES,
  id: string,
  arrayLength?: number,
  structProperties?: StructConfig
) =>
  `${propertyType.toLowerCase()} ${getValueTypeString(
    valueType,
    structProperties
  )} ${id}${arrayLength ? `[${arrayLength}]` : ""};`;

const getValueTypeString = (
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES,
  structProperties?: StructConfig
) => {
  switch (valueType) {
    case SHADER_PROPERTY_VALUE_TYPES.STRUCT:
      if (structProperties) {
        return structProperties.id;
      }
      console.warn("Struct properties not defined");
      return "";
    case SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D:
      return "sampler2D";
    default:
      return valueType.toLowerCase();
  }
};
