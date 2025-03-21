"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInteractiveEffects = void 0;
const formatFragmentParameters_1 = require("../../../helpers/formatFragmentParameters");
const reduceFunctions_1 = require("../../../helpers/reduceFunctions");
const mergeAttributeConfigs_1 = require("../../../shader-properties/attributes/helpers/mergeAttributeConfigs");
const mergeUniformConfigs_1 = require("../../../shader-properties/uniforms/helpers/mergeUniformConfigs");
const mergeVaryingConfigs_1 = require("../../../shader-properties/varyings/helpers/mergeVaryingConfigs");
const interactiveEffect_consts_1 = require("./interactiveEffect.consts");
const interactiveEffectTransform_1 = require("./interactiveEffectTransform");
const getInteractiveEffects = (effectProps) => {
    const effectParams = (0, formatFragmentParameters_1.formatFragmentParameters)(effectProps, interactiveEffect_consts_1.DEFAULT_INTERACTIVE_EFFECT);
    const { uniformConfig: effectUniforms, varyingConfig: effectVaryings, transformation, requiredFunctions: effectFunctions, attributeConfig: effectAttributes, } = (0, interactiveEffectTransform_1.getInteractiveEffectTransform)(effectParams);
    const mergedUniformConfigs = (0, mergeUniformConfigs_1.mergeUniformConfigs)([effectUniforms]);
    const mergedVaryingConfigs = (0, mergeVaryingConfigs_1.mergeVaryingConfigs)([effectVaryings]);
    const mergedRequiredFunction = (0, reduceFunctions_1.reduceFunctions)([effectFunctions]);
    const mergedAttributeConfigs = (0, mergeAttributeConfigs_1.mergeAttributeConfigs)([effectAttributes]);
    return {
        requiredFunctions: mergedRequiredFunction,
        uniformConfig: mergedUniformConfigs,
        transformation,
        varyingConfig: mergedVaryingConfigs,
        attributeConfig: mergedAttributeConfigs,
    };
};
exports.getInteractiveEffects = getInteractiveEffects;
