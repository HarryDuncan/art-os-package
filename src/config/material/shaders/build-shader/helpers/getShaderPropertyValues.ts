import { ShaderPropertyTypes } from "../constants/buildShader.consts";
import { ShaderPropertyConfig } from "../types";
import { createDeclarationString } from "./createDeclarationString";
import { getDefaultValue } from "./getDefaultValue";

interface CustomProperties {
  [key: string]: { value: unknown } | { value: unknown }[];
}
export const setUpCustomPropertyValues = (
  config: ShaderPropertyConfig[],
  propertyType: ShaderPropertyTypes
) => {
  const customProperties: CustomProperties = {};
  const customStrings: string[] = [];
  config.forEach(
    ({ value, id, valueType, arrayLength, structProperties, arrayValue }) => {
      if (arrayLength !== undefined) {
        const propertyValues =
          arrayValue ??
          new Array(arrayLength).fill(
            value ?? getDefaultValue(valueType, structProperties)
          );
        customProperties[id] = { value: propertyValues };
      } else {
        const propertyValue =
          value ?? getDefaultValue(valueType, structProperties);
        if (propertyValue !== undefined && propertyValue !== null) {
          customProperties[id] = { value: propertyValue };
        } else {
          console.warn(`Property value for ${id} ${valueType} is undefined`);
        }
      }

      customStrings.push(
        createDeclarationString(
          propertyType,
          valueType,
          id,
          arrayLength,
          structProperties
        )
      );
    }
  );
  return { customProperties, customStrings };
};
