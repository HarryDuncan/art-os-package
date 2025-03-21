"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpCustom = void 0;
const three_1 = require("three");
const buildShader_consts_1 = require("../../../constants/buildShader.consts");
const createDeclarationString_1 = require("../../../helpers/createDeclarationString");
const setUpCustom = (config = []) => {
    const customUniforms = {};
    const customStrings = [];
    config.forEach(({ value, id, valueType }) => {
        switch (valueType) {
            case buildShader_consts_1.ShaderPropertyValueTypes.INT:
                customUniforms[id] = { value: value !== null && value !== void 0 ? value : 0 };
                customStrings.push(addUniformString(id, valueType));
                break;
            case buildShader_consts_1.ShaderPropertyValueTypes.FLOAT:
                customUniforms[id] = { value: value !== null && value !== void 0 ? value : 0 };
                customStrings.push(addUniformString(id, valueType));
                break;
            case buildShader_consts_1.ShaderPropertyValueTypes.BOOL:
                customUniforms[id] = { value: value !== null && value !== void 0 ? value : false };
                customStrings.push(addUniformString(id, valueType));
                break;
            case buildShader_consts_1.ShaderPropertyValueTypes.VEC2:
                customUniforms[id] = { value: value !== null && value !== void 0 ? value : new three_1.Vector2() };
                customStrings.push(addUniformString(id, valueType));
                break;
            case buildShader_consts_1.ShaderPropertyValueTypes.VEC3:
                customUniforms[id] = { value: value !== null && value !== void 0 ? value : new three_1.Vector3() };
                customStrings.push(addUniformString(id, valueType));
                break;
            case buildShader_consts_1.ShaderPropertyValueTypes.VEC4:
                customUniforms[id] = { value: value !== null && value !== void 0 ? value : new three_1.Vector4() };
                customStrings.push(addUniformString(id, valueType));
                break;
            case buildShader_consts_1.ShaderPropertyValueTypes.MAT2:
                // customUniforms[id] = { value: value ?? new Matrix2() };
                console.warn("mat 2 not configured");
                customStrings.push(addUniformString(id, valueType));
                break;
            case buildShader_consts_1.ShaderPropertyValueTypes.MAT3:
                customUniforms[id] = { value: value !== null && value !== void 0 ? value : new three_1.Matrix3() };
                customStrings.push(addUniformString(id, valueType));
                break;
            case buildShader_consts_1.ShaderPropertyValueTypes.MAT4:
                customUniforms[id] = { value: value !== null && value !== void 0 ? value : new three_1.Matrix4() };
                customStrings.push(addUniformString(id, valueType));
                break;
            case buildShader_consts_1.ShaderPropertyValueTypes.SAMPLER2D:
                customUniforms[id] = { value: value !== null && value !== void 0 ? value : null };
                customStrings.push(addUniformString(id, valueType));
                break;
            case buildShader_consts_1.ShaderPropertyValueTypes.SAMPLER_CUBE:
                customUniforms[id] = { value: value !== null && value !== void 0 ? value : null };
                customStrings.push(addUniformString(id, valueType));
                break;
            case buildShader_consts_1.ShaderPropertyValueTypes.VOID:
                break;
            case buildShader_consts_1.ShaderPropertyValueTypes.CONST:
                customStrings.push(addUniformString(id, valueType));
                break;
            default:
                console.warn(`uniform configuration not set for ${valueType}`);
        }
    });
    return { customUniforms, customStrings };
};
exports.setUpCustom = setUpCustom;
const addUniformString = (id, valueType) => (0, createDeclarationString_1.createDeclarationString)(buildShader_consts_1.ShaderPropertyTypes.UNIFORM, valueType, id);
