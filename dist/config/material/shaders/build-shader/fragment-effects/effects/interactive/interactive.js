"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInteractiveEffects = void 0;
const reduceFunctions_1 = require("../../../helpers/reduceFunctions");
const mergeAttributeConfigs_1 = require("../../../shader-properties/attributes/helpers/mergeAttributeConfigs");
const mergeUniformConfigs_1 = require("../../../shader-properties/uniforms/helpers/mergeUniformConfigs");
const mergeVaryingConfigs_1 = require("../../../shader-properties/varyings/helpers/mergeVaryingConfigs");
const fragmentEffects_consts_1 = require("../../fragmentEffects.consts");
const color_1 = require("../color/color");
const defaultFragmentEffect_1 = require("../defaultFragmentEffect/defaultFragmentEffect");
const getInteractiveEffects = (transformName, effectProps) => {
    const { uniformConfig: effectUniforms, varyingConfig: effectVaryings, transformation: effectTransformation, requiredFunctions: effectFunctions, attributeConfig: effectAttributes, } = getEffectData(effectProps);
    const transformation = `
        vec4 ${fragmentEffects_consts_1.FRAG_COLOR_NAME} = ${transformName};
      
        if(vAffected == 1.0){
            ${effectTransformation};
        }
    `;
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
const getEffectData = (interactiveEffectProps) => {
    const { effectType, effectProps } = interactiveEffectProps;
    switch (effectType) {
        case fragmentEffects_consts_1.FRAGMENT_EFFECT.COLOR:
            return (0, color_1.color)(effectProps);
        default:
            console.warn(`No interactive effect configured for ${effectProps}`);
            return (0, defaultFragmentEffect_1.defaultFragmentEffect)();
    }
};
