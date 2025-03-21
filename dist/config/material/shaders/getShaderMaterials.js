"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShaderMaterials = void 0;
const three_1 = require("three");
const configureBlendingOptions_1 = require("../blending-options/configureBlendingOptions");
const configureShaders_1 = require("./configureShaders");
const materials_consts_1 = require("../materials.consts");
const getShaderMaterials = (config, assets) => {
    const { globalMaterialConfigs } = config;
    if (!globalMaterialConfigs)
        return [];
    return globalMaterialConfigs.flatMap((materialConfig) => {
        if (materials_consts_1.SHADER_MATERIALS.includes(materialConfig.materialType)) {
            const shaderMaterial = setUpShaderMaterial(materialConfig, assets);
            if (shaderMaterial) {
                shaderMaterial.name = materialConfig.id;
                return shaderMaterial;
            }
        }
        return [];
    });
};
exports.getShaderMaterials = getShaderMaterials;
const setUpShaderMaterial = (materialConfig, assets) => {
    const { shaderConfig, uniforms } = materialConfig.materialProps;
    const { vertexShader, fragmentShader, configuredUniforms } = (0, configureShaders_1.configureShaders)(shaderConfig, uniforms, assets);
    const blendingOptions = (0, configureBlendingOptions_1.configureBlendingOptions)(materialConfig.blendingConfig);
    switch (materialConfig.materialType) {
        case materials_consts_1.MATERIAL_TYPES.SHADER: {
            return new three_1.ShaderMaterial(Object.assign({ uniforms: configuredUniforms, vertexShader,
                fragmentShader }, blendingOptions));
        }
        default:
            return null;
    }
};
