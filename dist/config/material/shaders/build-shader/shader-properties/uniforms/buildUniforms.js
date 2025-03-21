"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUniforms = void 0;
const buildShader_consts_1 = require("../../constants/buildShader.consts");
const createDeclarationString_1 = require("../../helpers/createDeclarationString");
const getShaderPropertyValues_1 = require("../../helpers/getShaderPropertyValues");
const getResolution_1 = require("./helpers/getResolution");
const uniforms_consts_1 = require("./uniforms.consts");
const constants_1 = require("../../constants");
const buildUniforms = (uniformConfig) => {
    const { defaultUniforms, defaultStrings } = setUpDefaultUniforms(uniformConfig.defaultUniforms);
    const { customUniforms, customStrings } = setUpCustom(uniformConfig === null || uniformConfig === void 0 ? void 0 : uniformConfig.customUniforms);
    const uniforms = Object.assign(Object.assign({}, defaultUniforms), customUniforms);
    const uniformDeclaration = [
        uniforms_consts_1.UNIFORM_DECLARATION,
        ...defaultStrings,
        ...customStrings,
    ].join(" \n ");
    return { uniforms, uniformDeclaration };
};
exports.buildUniforms = buildUniforms;
const setUpDefaultUniforms = (uniformConfig) => {
    const defaultUniforms = { uTime: { value: 0.0 } };
    const defaultStrings = [`uniform float uTime;`];
    uniformConfig.forEach((uniformKey) => {
        const defaultUniform = constants_1.DEFAULT_UNIFORMS[uniformKey];
        if (!defaultUniform) {
            console.warn(`uniform configuration not set for ${uniformKey}`);
        }
        else {
            const uniformString = (0, createDeclarationString_1.createDeclarationString)(buildShader_consts_1.ShaderPropertyTypes.UNIFORM, defaultUniform.valueType, uniformKey);
            const uniformValue = getDefaultUniformValue(uniformKey);
            defaultUniforms[uniformKey] = { value: uniformValue };
            defaultStrings.push(uniformString);
        }
    });
    return { defaultUniforms, defaultStrings };
};
const setUpCustom = (config = []) => {
    const { customProperties, customStrings } = (0, getShaderPropertyValues_1.setUpCustomPropertyValues)(config, buildShader_consts_1.ShaderPropertyTypes.UNIFORM);
    return { customUniforms: customProperties, customStrings };
};
const getDefaultUniformValue = (uniformKey) => {
    switch (uniformKey) {
        case "uResolution":
            return (0, getResolution_1.getResolution)();
        default:
            return constants_1.DEFAULT_UNIFORMS[uniformKey]
                .defaultValue;
    }
};
