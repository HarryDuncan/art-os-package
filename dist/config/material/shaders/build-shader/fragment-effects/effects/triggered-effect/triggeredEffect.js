"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggeredEffect = void 0;
const mergeUniformConfigs_1 = require("../../../shader-properties/uniforms/helpers/mergeUniformConfigs");
const mergeVaryingConfigs_1 = require("../../../shader-properties/varyings/helpers/mergeVaryingConfigs");
const reduceFunctions_1 = require("../../../helpers/reduceFunctions");
const mergeAttributeConfigs_1 = require("../../../shader-properties/attributes/helpers/mergeAttributeConfigs");
const triggeredEffect_consts_1 = require("./triggeredEffect.consts");
const triggeredEffectTransform_1 = require("./triggeredEffectTransform");
const formatFragmentParameters_1 = require("../../../helpers/formatFragmentParameters");
const triggeredEffect = (effectProps) => {
    const effectParams = (0, formatFragmentParameters_1.formatFragmentParameters)(effectProps, triggeredEffect_consts_1.DEFAULT_TRIGGERED_EFFECT);
    const { effectUniforms, effectVaryings, effectFunctions, transformation, effectAttributes, } = (0, triggeredEffectTransform_1.triggeredEffectTransform)(effectParams);
    const mergedUniformConfigs = (0, mergeUniformConfigs_1.mergeUniformConfigs)([
        effectUniforms,
        triggeredEffect_consts_1.TRIGGERED_UNIFORM_CONFIG,
    ]);
    const mergedVaryingConfigs = (0, mergeVaryingConfigs_1.mergeVaryingConfigs)([
        effectVaryings,
        triggeredEffect_consts_1.TRIGGERED_VARYING_CONFIG,
    ]);
    const mergedRequiredFunction = (0, reduceFunctions_1.reduceFunctions)([
        effectFunctions,
        triggeredEffect_consts_1.TRIGGERED_FUNCTIONS,
    ]);
    const mergedAttributeConfigs = (0, mergeAttributeConfigs_1.mergeAttributeConfigs)([
        effectAttributes,
        triggeredEffect_consts_1.TRIGGERED_ATTRIBUTE_CONFIGS,
    ]);
    return {
        requiredFunctions: mergedRequiredFunction,
        uniformConfig: mergedUniformConfigs,
        attributeConfig: mergedAttributeConfigs,
        varyingConfig: mergedVaryingConfigs,
        transformation,
    };
};
exports.triggeredEffect = triggeredEffect;
