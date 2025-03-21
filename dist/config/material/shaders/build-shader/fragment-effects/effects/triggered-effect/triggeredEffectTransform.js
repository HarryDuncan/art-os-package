"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggeredEffectTransform = void 0;
const fragmentEffects_consts_1 = require("../../fragmentEffects.consts");
const color_1 = require("../color/color");
const defaultFragmentEffect_1 = require("../defaultFragmentEffect/defaultFragmentEffect");
const opacity_1 = require("../opacity/opacity");
const triggeredEffect_consts_1 = require("./triggeredEffect.consts");
const triggeredEffectTransform = (effectProps) => {
    const { uniformConfig: effectUniforms, varyingConfig: effectVaryings, transformation: effectTransformation, requiredFunctions: effectFunctions, attributeConfig: effectAttributes, } = getEffectData(effectProps);
    const transformation = formatTransform(effectTransformation);
    return {
        effectUniforms,
        effectVaryings,
        effectFunctions,
        transformation,
        effectAttributes,
    };
};
exports.triggeredEffectTransform = triggeredEffectTransform;
const formatTransform = (transform) => {
    return `// TRIGGERED FRAG
           
           
              float isTriggered = 0.0;
              if(uIsTriggered >= 1.0){
                  ${transform}
                  isTriggered = 1.0;
              }
              `;
};
const getEffectData = (triggeredEffectProps) => {
    const { effectType, effectProps } = triggeredEffectProps;
    const formattedEffectProps = Object.assign(Object.assign({}, triggeredEffect_consts_1.DEFAULT_TRIGGERED_EFFECT), effectProps);
    switch (effectType) {
        case fragmentEffects_consts_1.FRAGMENT_EFFECT.COLOR:
            return (0, color_1.color)(formattedEffectProps);
        case fragmentEffects_consts_1.FRAGMENT_EFFECT.OPACITY:
            return (0, opacity_1.opacity)(formattedEffectProps);
        case fragmentEffects_consts_1.FRAGMENT_EFFECT.EMPTY:
        default:
            console.warn(`No interactive effect configured for ${effectProps}`);
            return (0, defaultFragmentEffect_1.defaultFragmentEffect)();
    }
};
