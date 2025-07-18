import {
  ParameterConfig,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../schema";
import { ShaderParameterMap } from "../types";
import { generateDeclaration } from "./helpers/generateDeclaration";

export const generateAttributes = (parameterMap: ShaderParameterMap) => {
  const attributeConfigs = Array.from(parameterMap.values()).filter(
    (parameter) => parameter.parameterType === SHADER_PROPERTY_TYPES.ATTRIBUTE
  );
  const declarationString = createDeclarationStrings(attributeConfigs);
  return declarationString;
};

const NON_DECLARABLE_ATTRIBUTES = ["position"];
const createDeclarationStrings = (config: ParameterConfig[]) => {
  // Create a map to ensure unique attribute IDs
  const attributeMap = new Map<string, ParameterConfig>();

  config.forEach((attribute) => {
    if (!NON_DECLARABLE_ATTRIBUTES.includes(attribute.key)) {
      attributeMap.set(attribute.key, attribute);
    }
  });

  return Array.from(attributeMap.values())
    .map(({ key, valueType }) =>
      generateDeclaration(
        SHADER_PROPERTY_TYPES.ATTRIBUTE as keyof typeof SHADER_PROPERTY_TYPES,
        valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
        key
      )
    )
    .join(" \n ");
};
