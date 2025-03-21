"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggeredEffect = void 0;
const mergeUniformConfigs_1 = require("../../../shader-properties/uniforms/helpers/mergeUniformConfigs");
const mergeVaryingConfigs_1 = require("../../../shader-properties/varyings/helpers/mergeVaryingConfigs");
const reduceFunctions_1 = require("../../../helpers/reduceFunctions");
const mergeAttributeConfigs_1 = require("../../../shader-properties/attributes/helpers/mergeAttributeConfigs");
const triggeredEffect_consts_1 = require("./triggeredEffect.consts");
const triggeredEffectTransform_1 = require("./triggeredEffectTransform");
const formatVertexParameters_1 = require("../../../helpers/formatVertexParameters");
const triggeredEffect = (effectProps) => {
    const triggeredEffectProps = (0, formatVertexParameters_1.formatVertexParameters)(effectProps, triggeredEffect_consts_1.DEFAULT_TRIGGERED_EFFECT);
    const uniformConfig = triggeredEffect_consts_1.TRIGGERED_UNIFORM_CONFIG;
    const varyingConfig = triggeredEffect_consts_1.TRIGGERED_VARYING_CONFIG;
    const { transformation, effectUniforms, effectVaryings, effectFunctions, effectAttributes, } = (0, triggeredEffectTransform_1.triggeredEffectTransform)(triggeredEffectProps);
    const requiredFunctions = [];
    const attributeConfig = [];
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
exports.triggeredEffect = triggeredEffect;
