import { ShaderPropertyConfig } from "../../../../../types/materials/shaders/buildShader.types";
import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../../../consts/materials/shader.consts";
import { createDeclarationString } from "./createDeclarationString";
import { getDefaultValue } from "./getDefaultValue";

interface CustomProperties {
  [key: string]: { value: unknown } | { value: unknown }[];
}
export const setUpCustomPropertyValues = (
  config: ShaderPropertyConfig[],
  propertyType: keyof typeof SHADER_PROPERTY_TYPES
) => {
  const customProperties: CustomProperties = {};
  const customStrings: string[] = [];
  config.forEach(
    ({ value, id, valueType, arrayLength, structProperties, arrayValue }) => {
      if (arrayLength !== undefined) {
        const propertyValues =
          arrayValue ??
          new Array(arrayLength).fill(
            value ??
              getDefaultValue(
                valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
                structProperties
              )
          );
        customProperties[id] = { value: propertyValues };
      } else {
        const propertyValue =
          value ??
          getDefaultValue(
            valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
            structProperties
          );
        if (propertyValue !== undefined && propertyValue !== null) {
          customProperties[id] = { value: propertyValue };
        } else {
          console.warn(
            `Property value for ${id} ${String(valueType)} is undefined`
          );
        }
      }

      customStrings.push(
        createDeclarationString(
          propertyType,
          valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
          id,
          arrayLength,
          structProperties
        )
      );
    }
  );
  return { customProperties, customStrings };
};
