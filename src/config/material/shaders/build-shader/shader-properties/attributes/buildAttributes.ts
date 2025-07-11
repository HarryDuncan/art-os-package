import { ParameterConfig } from "../../buildShader.types";
import {
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
} from "../../constants/shader.consts";
import { createDeclarationString } from "../../helpers/createDeclarationString";

export const buildAttributes = (parameterConfigs: ParameterConfig[]) => {
  const attributeConfigs = parameterConfigs.filter(
    (parameterConfig) =>
      parameterConfig.parameterType === SHADER_PROPERTY_TYPES.ATTRIBUTE
  );
  const declarationString = createDeclarationStrings(attributeConfigs);
  return declarationString;
};

const NON_DECLARABLE_ATTRIBUTES = ["position"];
const createDeclarationStrings = (config: ParameterConfig[]) => {
  // Create a map to ensure unique attribute IDs
  const attributeMap = new Map<string, ParameterConfig>();

  config.forEach((attribute) => {
    if (!NON_DECLARABLE_ATTRIBUTES.includes(attribute.id)) {
      attributeMap.set(attribute.id, attribute);
    }
  });

  return Array.from(attributeMap.values())
    .map(({ id, valueType }) =>
      createDeclarationString(
        SHADER_PROPERTY_TYPES.ATTRIBUTE as keyof typeof SHADER_PROPERTY_TYPES,
        valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
        id
      )
    )
    .join(" \n ");
};
