"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opacity = void 0;
const opacity_consts_1 = require("./opacity.consts");
const formatFragmentParameters_1 = require("../../../helpers/formatFragmentParameters");
const opacityTransform_1 = require("./opacityTransform");
const opacity = (effectProps) => {
    const formattedEffectParams = (0, formatFragmentParameters_1.formatFragmentParameters)(effectProps, opacity_consts_1.DEFAULT_OPACITY_EFFECT_PARAMS);
    const uniformConfig = opacity_consts_1.OPACITY_UNIFORMS;
    const varyingConfig = opacity_consts_1.OPACITY_VARYINGS;
    const requiredFunctions = opacity_consts_1.OPACITY_FUNCTIONS;
    const attributeConfig = opacity_consts_1.OPACITY_ATTRIBUTES;
    const { transformation } = (0, opacityTransform_1.opacityTransform)(formattedEffectParams);
    return {
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
        attributeConfig,
    };
};
exports.opacity = opacity;
