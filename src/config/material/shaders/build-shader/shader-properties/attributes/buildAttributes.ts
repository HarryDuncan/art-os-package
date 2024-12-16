import { ShaderPropertyTypes } from "../../constants/buildShader.consts";
import { AttributeConfig } from "../../types";
import { createDeclarationString } from "../../helpers/createDeclarationString";

export const buildAttributes = (config: AttributeConfig[]) => {
  const declarationString = createDeclarationStrings(config);
  return declarationString;
};

const NON_DECLARABLE_ATTRIBUTES = ["position"];
const createDeclarationStrings = (config: AttributeConfig[]) =>
  config
    .flatMap(({ id, valueType }) =>
      NON_DECLARABLE_ATTRIBUTES.includes(id)
        ? []
        : createDeclarationString(
            ShaderPropertyTypes.ATTRIBUTE as ShaderPropertyTypes,
            valueType,
            id
          )
    )
    .join(" \n ");
