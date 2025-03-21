"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggeredEffectTransform = void 0;
const constants_1 = require("../../../constants");
const fragmentEffects_consts_1 = require("../../../fragment-effects/fragmentEffects.consts");
const vertexEffects_consts_1 = require("../../vertexEffects.consts");
const expand_1 = require("../displacement/expand/expand");
const explode_1 = require("../displacement/explode/explode");
const rotation_1 = require("../rotation/rotation");
const triggeredEffect_consts_1 = require("./triggeredEffect.consts");
const triggeredEffectTransform = (triggeredEffectProps) => {
    const { uniformConfig: effectUniforms, varyingConfig: effectVaryings, transformation: effectTransform, requiredFunctions: effectFunctions, attributeConfig: effectAttributes, } = getEffectData(triggeredEffectProps);
    const transformation = `
              float isTriggered = 0.0;
              if(uIsTriggered >= 1.0){
                  ${effectTransform}
                  isTriggered = 1.0;
              }
              `;
    return {
        transformation,
        effectUniforms,
        effectVaryings,
        effectFunctions,
        effectAttributes,
    };
};
exports.triggeredEffectTransform = triggeredEffectTransform;
const getEffectData = (triggeredEffectProps) => {
    const { effectType, effectProps } = triggeredEffectProps;
    const formattedEffectProps = Object.assign(Object.assign({}, triggeredEffect_consts_1.DEFAULT_TRIGGERED_EFFECT), effectProps);
    switch (effectType) {
        case vertexEffects_consts_1.VERTEX_EFFECTS.EXPLODE:
            return (0, explode_1.explode)(formattedEffectProps);
        case vertexEffects_consts_1.VERTEX_EFFECTS.EXPAND:
            return (0, expand_1.expand)(formattedEffectProps);
        case vertexEffects_consts_1.VERTEX_EFFECTS.ROTATE:
            return (0, rotation_1.rotationEffect)(formattedEffectProps);
        case fragmentEffects_consts_1.TRIGGERED_FRAGMENT_EFFECT.EMPTY:
        default:
            return Object.assign({}, constants_1.DEFAULT_VERTEX_EFFECT);
    }
};
