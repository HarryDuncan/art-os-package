"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageVertexEffect = void 0;
const mergeUniformConfigs_1 = require("../../../shader-properties/uniforms/helpers/mergeUniformConfigs");
const mergeVaryingConfigs_1 = require("../../../shader-properties/varyings/helpers/mergeVaryingConfigs");
const reduceFunctions_1 = require("../../../helpers/reduceFunctions");
const mergeAttributeConfigs_1 = require("../../../shader-properties/attributes/helpers/mergeAttributeConfigs");
const imageVertexEffectTransform_1 = require("./imageVertexEffectTransform");
const formatVertexParameters_1 = require("../../../helpers/formatVertexParameters");
const imageVertexEffects_consts_1 = require("./imageVertexEffects.consts");
const imageVertexEffect = (effectProps) => {
    const imageVertexEffectProps = (0, formatVertexParameters_1.formatVertexParameters)(effectProps, imageVertexEffects_consts_1.DEFAULT_IMAGE_VERTEX_EFFECT_PROPS);
    const { transformation, effectUniforms, effectVaryings, effectFunctions, effectAttributes, } = (0, imageVertexEffectTransform_1.imageVertexEffectTransform)(imageVertexEffectProps);
    const uniformConfig = imageVertexEffects_consts_1.IMAGE_VERTEX_UNIFORM_CONFIG;
    const varyingConfig = imageVertexEffects_consts_1.IMAGE_VERTEX_VARYING_CONFIG;
    const requiredFunctions = imageVertexEffects_consts_1.IMAGE_VERTEX_REQUIRED_FUNCTIONS;
    const attributeConfig = imageVertexEffects_consts_1.IMAGE_VERTEX_ATTRIBUTE_CONFIG;
    const mergedUniformConfigs = (0, mergeUniformConfigs_1.mergeUniformConfigs)([
        effectUniforms,
        uniformConfig,
    ]);
    const mergedVaryingConfigs = (0, mergeVaryingConfigs_1.mergeVaryingConfigs)([
        effectVaryings,
        varyingConfig,
    ]);
    const mergedRequiredFunction = (0, reduceFunctions_1.reduceFunctions)([
        effectFunctions,
        requiredFunctions,
    ]);
    const mergedAttributeConfigs = (0, mergeAttributeConfigs_1.mergeAttributeConfigs)([
        attributeConfig,
        effectAttributes,
    ]);
    return {
        requiredFunctions: mergedRequiredFunction,
        uniformConfig: mergedUniformConfigs,
        attributeConfig: mergedAttributeConfigs,
        transformation,
        varyingConfig: mergedVaryingConfigs,
    };
};
exports.imageVertexEffect = imageVertexEffect;
