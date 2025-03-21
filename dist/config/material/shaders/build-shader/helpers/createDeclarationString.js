"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeclarationString = void 0;
const buildShader_consts_1 = require("../constants/buildShader.consts");
const createDeclarationString = (propertyType, valueType, id, arrayLength, structProperties) => `${propertyType.toLowerCase()} ${getValueTypeString(valueType, structProperties)} ${id}${arrayLength ? `[${arrayLength}]` : ""};`;
exports.createDeclarationString = createDeclarationString;
const getValueTypeString = (valueType, structProperties) => {
    switch (valueType) {
        case buildShader_consts_1.ShaderPropertyValueTypes.STRUCT:
            if (structProperties) {
                return structProperties.id;
            }
            console.warn("Struct properties not defined");
            return "";
        case buildShader_consts_1.ShaderPropertyValueTypes.SAMPLER2D:
            return "sampler2D";
        default:
            return valueType.toLowerCase();
    }
};
