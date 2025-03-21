"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distortionTransform = void 0;
const vertexEffectToEffectData_1 = require("../../../../helpers/vertexEffectToEffectData");
const vertexEffects_consts_1 = require("../../../vertexEffects.consts");
const flexyTwister_1 = require("./flexy-twister/flexyTwister");
const stretch_1 = require("./stretch/stretch");
const twistTransformation_1 = require("./twist/twistTransformation");
const distortionTransform = (distortEffectProps) => {
    const { transformation, uniformConfig, varyingConfig, requiredFunctions, } = getTransformation(distortEffectProps);
    return {
        transformation,
        uniformConfig,
        requiredFunctions,
        varyingConfig,
    };
};
exports.distortionTransform = distortionTransform;
const getTransformation = (distortEffectProps) => {
    const { distortionType, effectProps } = distortEffectProps;
    switch (distortionType) {
        case vertexEffects_consts_1.DISTORTION_TYPES.STRETCH:
            return (0, vertexEffectToEffectData_1.vertexEffectToEffectData)((0, stretch_1.stretch)(effectProps));
        case vertexEffects_consts_1.DISTORTION_TYPES.FLEXY_TWISTER:
            return (0, vertexEffectToEffectData_1.vertexEffectToEffectData)((0, flexyTwister_1.flexyTwister)(effectProps));
        case vertexEffects_consts_1.DISTORTION_TYPES.TWIST:
        default: {
            const twistTransformationData = (0, twistTransformation_1.twistTransformation)(effectProps);
            return (0, vertexEffectToEffectData_1.vertexEffectToEffectData)(twistTransformationData);
        }
    }
};
