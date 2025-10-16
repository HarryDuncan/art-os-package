import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../schema";

export const generateDeclaration = (
  propertyType: keyof typeof SHADER_PROPERTY_TYPES,
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES,
  id: string,
  options?: {
    flat?: boolean;
  },
  arrayLength?: number
  // structProperties?: StructConfig
) =>
  `${
    options?.flat ? "flat " : ""
  } ${propertyType.toLowerCase()} ${getValueTypeString(
    valueType
    // structProperties
  )} ${id}${arrayLength ? `[${arrayLength}]` : ""};`;

const getValueTypeString = (
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES
  // structProperties?: StructConfig
) => {
  switch (valueType) {
    case SHADER_PROPERTY_VALUE_TYPES.STRUCT:
      // if (structProperties) {
      //   return structProperties.key;
      // }
      console.warn("Struct properties not defined");
      return "";
    case SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D:
      return "sampler2D";
    default:
      return valueType.toLowerCase();
  }
};
