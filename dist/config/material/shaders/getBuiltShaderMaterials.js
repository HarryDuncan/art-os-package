"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuiltShaderMaterials = void 0;
const three_1 = require("three");
const buildShader_1 = require("./build-shader/buildShader");
const formatBuiltShaderConfig_1 = require("./shader-formatting/formatBuiltShaderConfig");
const formatBuiltShaderUniforms_1 = require("./shader-formatting/formatBuiltShaderUniforms");
const configureBlendingOptions_1 = require("../blending-options/configureBlendingOptions");
const getAttributeValuesFromAsset_1 = require("../../mesh/attributes/getAttributeValuesFromAsset");
const materials_consts_1 = require("../materials.consts");
const getBuiltShaderMaterials = (config, assets) => {
    const { globalMaterialConfigs } = config;
    if (!globalMaterialConfigs)
        return {
            attributeConfigs: [],
            builtShaders: [],
        };
    const builtShadersAndAttributes = globalMaterialConfigs.flatMap((materialConfig) => {
        if (materialConfig.materialType === materials_consts_1.MATERIAL_TYPES.BUILT_SHADER) {
            const { builtShaderConfig, assetMapping } = materialConfig;
            if (!builtShaderConfig)
                return [];
            const shaderConfig = (0, formatBuiltShaderConfig_1.formatBuiltShaderConfig)(builtShaderConfig);
            const { uniforms, vertexShader, fragmentShader, attributeConfigs } = (0, buildShader_1.buildShader)(shaderConfig);
            const attributesFromAssets = (0, getAttributeValuesFromAsset_1.getAttributeValuesFromAssets)(attributeConfigs, assets);
            const formattedUniforms = (0, formatBuiltShaderUniforms_1.formatBuiltShaderUniforms)(uniforms, assetMapping !== null && assetMapping !== void 0 ? assetMapping : [], assets);
            const blendingOptions = (0, configureBlendingOptions_1.configureBlendingOptions)(materialConfig.blendingConfig);
            const shader = new three_1.ShaderMaterial(Object.assign(Object.assign({ uniforms: formattedUniforms, vertexShader,
                fragmentShader }, blendingOptions), { side: three_1.DoubleSide }));
            shader.name = materialConfig.id;
            return { shader, attributeConfigs: attributesFromAssets };
        }
        return [];
    });
    const builtShaders = builtShadersAndAttributes.map(({ shader }) => shader);
    const shaderAttributeConfigs = builtShadersAndAttributes.map(({ shader, attributeConfigs }) => ({
        materialId: shader.name,
        attributeConfigs,
    }));
    return { attributeConfigs: shaderAttributeConfigs, builtShaders };
};
exports.getBuiltShaderMaterials = getBuiltShaderMaterials;
