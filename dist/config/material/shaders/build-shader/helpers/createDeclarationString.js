import { ShaderPropertyValueTypes, } from "../constants/buildShader.consts";
export const createDeclarationString = (propertyType, valueType, id, arrayLength, structProperties) => `${propertyType.toLowerCase()} ${getValueTypeString(valueType, structProperties)} ${id}${arrayLength ? `[${arrayLength}]` : ""};`;
const getValueTypeString = (valueType, structProperties) => {
    switch (valueType) {
        case ShaderPropertyValueTypes.STRUCT:
            if (structProperties) {
                return structProperties.id;
            }
            console.warn("Struct properties not defined");
            return "";
        case ShaderPropertyValueTypes.SAMPLER2D:
            return "sampler2D";
        default:
            return valueType.toLowerCase();
    }
};
