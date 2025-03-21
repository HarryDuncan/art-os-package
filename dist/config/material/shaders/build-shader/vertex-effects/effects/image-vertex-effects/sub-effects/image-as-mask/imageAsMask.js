"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageAsMask = void 0;
const formatVertexParameters_1 = require("../../../../../helpers/formatVertexParameters");
const reduceFunctions_1 = require("../../../../../helpers/reduceFunctions");
const mergeAttributeConfigs_1 = require("../../../../../shader-properties/attributes/helpers/mergeAttributeConfigs");
const mergeUniformConfigs_1 = require("../../../../../shader-properties/uniforms/helpers/mergeUniformConfigs");
const mergeVaryingConfigs_1 = require("../../../../../shader-properties/varyings/helpers/mergeVaryingConfigs");
const imageAsMask_consts_1 = require("./imageAsMask.consts");
const imageAsMaskTransform_1 = require("./imageAsMaskTransform");
const imageAsMask = (effectProps) => {
    const imageAsMaskEffectProps = (0, formatVertexParameters_1.formatVertexParameters)(effectProps, imageAsMask_consts_1.DEFAULT_IMAGE_AS_MASK_EFFECT_PROPS);
    const { transformation, effectUniforms, effectVaryings, effectFunctions, effectAttributes, } = (0, imageAsMaskTransform_1.imageAsMaskTransform)(imageAsMaskEffectProps);
    const uniformConfig = imageAsMask_consts_1.IMAGE_AS_MASK_UNIFORM_CONFIG;
    const varyingConfig = imageAsMask_consts_1.IMAGE_AS_MASK_VARYING_CONFIG;
    const requiredFunctions = imageAsMask_consts_1.IMAGE_AS_MASK_REQUIRED_FUNCTIONS;
    const attributeConfig = imageAsMask_consts_1.IMAGE_AS_MASK_ATTRIBUTE_CONFIG;
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
exports.imageAsMask = imageAsMask;
