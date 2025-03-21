"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.color = void 0;
const colorTransformation_1 = require("./colorTransformation");
const color_consts_1 = require("./color.consts");
const formatFragmentParameters_1 = require("../../../helpers/formatFragmentParameters");
const color = (effectProps) => {
    const formattedEffectProps = (0, formatFragmentParameters_1.formatFragmentParameters)(effectProps, color_consts_1.DEFAULT_COLOR_EFFECT_PROPS);
    const uniformConfig = color_consts_1.DEFAULT_COLOR_UNIFORMS;
    const varyingConfig = color_consts_1.DEFAULT_COLOR_VARYINGS;
    const requiredFunctions = color_consts_1.DEFAULT_COLOR_FUNCTIONS;
    const transformation = (0, colorTransformation_1.colorTransformation)(formattedEffectProps);
    return {
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
        attributeConfig: [],
    };
};
exports.color = color;
