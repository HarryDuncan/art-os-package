"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAttributes = void 0;
const buildShader_consts_1 = require("../../constants/buildShader.consts");
const createDeclarationString_1 = require("../../helpers/createDeclarationString");
const buildAttributes = (config) => {
    const declarationString = createDeclarationStrings(config);
    return declarationString;
};
exports.buildAttributes = buildAttributes;
const NON_DECLARABLE_ATTRIBUTES = ["position"];
const createDeclarationStrings = (config) => config
    .flatMap(({ id, valueType }) => NON_DECLARABLE_ATTRIBUTES.includes(id)
    ? []
    : (0, createDeclarationString_1.createDeclarationString)(buildShader_consts_1.ShaderPropertyTypes.ATTRIBUTE, valueType, id))
    .join(" \n ");
