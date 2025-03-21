"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageVertexEffectTransform = void 0;
const constants_1 = require("../../../constants");
const vertexEffects_consts_1 = require("../../vertexEffects.consts");
const imageAsMask_1 = require("./sub-effects/image-as-mask/imageAsMask");
const imageToPoints_1 = require("./sub-effects/image-to-points/imageToPoints");
const imageVertexEffectTransform = (imageVertexEffectProps) => {
    const { effectType } = imageVertexEffectProps;
    const { uniformConfig: effectUniforms, varyingConfig: effectVaryings, transformation: effectTransform, requiredFunctions: effectFunctions, attributeConfig: effectAttributes, } = getEffectData(effectType, imageVertexEffectProps);
    const transformation = `
 
  ${effectTransform}

`;
    return {
        transformation,
        effectUniforms,
        effectVaryings,
        effectFunctions,
        effectAttributes,
    };
};
exports.imageVertexEffectTransform = imageVertexEffectTransform;
const getEffectData = (effectType, effectProps) => {
    switch (effectType) {
        case vertexEffects_consts_1.IMAGE_VERTEX_EFFECT.IMAGE_AS_MASK:
            return (0, imageAsMask_1.imageAsMask)(effectProps);
        case vertexEffects_consts_1.IMAGE_VERTEX_EFFECT.IMAGE_TO_POINTS:
            return (0, imageToPoints_1.imageToPoints)(effectProps);
        default:
            return Object.assign({}, constants_1.DEFAULT_VERTEX_EFFECT);
    }
};
