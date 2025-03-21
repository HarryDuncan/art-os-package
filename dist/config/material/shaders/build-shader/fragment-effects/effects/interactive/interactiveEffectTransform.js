"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInteractiveEffectTransform = void 0;
const fragmentEffects_consts_1 = require("../../fragmentEffects.consts");
const color_1 = require("../color/color");
const defaultFragmentEffect_1 = require("../defaultFragmentEffect/defaultFragmentEffect");
const getInteractiveEffectTransform = (interactiveEffectProps) => {
    const { uniformConfig, varyingConfig, transformation: effectTransformation, requiredFunctions, attributeConfig, } = getEffectData(interactiveEffectProps);
    const transformation = `
    

    if(vAffected == 1.0){
        ${effectTransformation};
    }
`;
    return {
        uniformConfig,
        varyingConfig,
        transformation,
        requiredFunctions,
        attributeConfig,
    };
};
exports.getInteractiveEffectTransform = getInteractiveEffectTransform;
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
