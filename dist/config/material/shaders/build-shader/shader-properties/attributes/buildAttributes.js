import { ShaderPropertyTypes } from "../../constants/buildShader.consts";
import { createDeclarationString } from "../../helpers/createDeclarationString";
export const buildAttributes = (config) => {
    const declarationString = createDeclarationStrings(config);
    return declarationString;
};
const NON_DECLARABLE_ATTRIBUTES = ["position"];
const createDeclarationStrings = (config) => config
    .flatMap(({ id, valueType }) => NON_DECLARABLE_ATTRIBUTES.includes(id)
    ? []
    : createDeclarationString(ShaderPropertyTypes.ATTRIBUTE, valueType, id))
    .join(" \n ");
