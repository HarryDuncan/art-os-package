"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brightness = void 0;
const brightness_consts_1 = require("./brightness.consts");
const formatFragmentParameters_1 = require("../../../helpers/formatFragmentParameters");
const brightnessTransform_1 = require("./brightnessTransform");
const brightness = (effectProps) => {
    const formattedEffectParams = (0, formatFragmentParameters_1.formatFragmentParameters)(effectProps, brightness_consts_1.DEFAULT_BRIGHTNESS_EFFECT_PARAMS);
    const uniformConfig = brightness_consts_1.BRIGHTNESS_UNIFORMS;
    const varyingConfig = brightness_consts_1.BRIGHTNESS_VARYINGS;
    const requiredFunctions = brightness_consts_1.BRIGHTNESS_FUNCTIONS;
    const attributeConfig = brightness_consts_1.BRIGHTNESS_ATTRIBUTES;
    const { transformation } = (0, brightnessTransform_1.brightnessTransform)(formattedEffectParams);
    return {
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
        attributeConfig,
    };
};
exports.brightness = brightness;
