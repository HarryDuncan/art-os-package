import { ParameterConfig } from "../../../../../../types/materials/index";
import {
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
} from "../../constants/shader.consts";
import { createDeclarationString } from "../../helpers/createDeclarationString";

export const buildAttributes = (config: ParameterConfig[]) => {
  const declarationString = createDeclarationStrings(config);
  return declarationString;
};

const NON_DECLARABLE_ATTRIBUTES = ["position"];
const createDeclarationStrings = (config: ParameterConfig[]) =>
  config
    .flatMap(({ id, valueType }) =>
      NON_DECLARABLE_ATTRIBUTES.includes(id)
        ? []
        : createDeclarationString(
            SHADER_PROPERTY_TYPES.ATTRIBUTE as keyof typeof SHADER_PROPERTY_TYPES,
            valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
            id
          )
    )
    .join(" \n ");
