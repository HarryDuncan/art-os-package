"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noiseTransition = void 0;
const formatVertexParameters_1 = require("../../../../../helpers/formatVertexParameters");
const reduceFunctions_1 = require("../../../../../helpers/reduceFunctions");
const mergeAttributeConfigs_1 = require("../../../../../shader-properties/attributes/helpers/mergeAttributeConfigs");
const mergeUniformConfigs_1 = require("../../../../../shader-properties/uniforms/helpers/mergeUniformConfigs");
const mergeVaryingConfigs_1 = require("../../../../../shader-properties/varyings/helpers/mergeVaryingConfigs");
const noiseTranstion_consts_1 = require("./noiseTranstion.consts");
const noiseTransitionTransform_1 = require("./noiseTransitionTransform");
const noiseTransition = (effectProps) => {
    const noiseTransitionEffectProps = (0, formatVertexParameters_1.formatVertexParameters)(effectProps, noiseTranstion_consts_1.DEFAULT_NOISE_TRANSITION_EFFECT_PROPS);
    const { transformation, effectUniforms, effectVaryings, effectFunctions, effectAttributes, } = (0, noiseTransitionTransform_1.noiseTransitionTransform)(noiseTransitionEffectProps);
    const uniformConfig = noiseTranstion_consts_1.NOISE_TRANSITION_UNIFORM_CONFIG;
    const varyingConfig = noiseTranstion_consts_1.NOISE_TRANSITION_VARYING_CONFIG;
    const requiredFunctions = noiseTranstion_consts_1.NOISE_TRANSITION_REQUIRED_FUNCTIONS;
    const attributeConfig = noiseTranstion_consts_1.NOISE_TRANSITION_ATTRIBUTE_CONFIG;
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
exports.noiseTransition = noiseTransition;
