"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vanishEffect = void 0;
const formatFragmentParameters_1 = require("../../../helpers/formatFragmentParameters");
const vanish_consts_1 = require("./vanish.consts");
const vanishTransform_1 = require("./vanishTransform");
const vanishEffect = (effectProps) => {
    const formattedEffectParams = (0, formatFragmentParameters_1.formatFragmentParameters)(effectProps, vanish_consts_1.DEFAULT_VANISH_EFFECT_PARAMS);
    const uniformConfig = vanish_consts_1.VANISH_UNIFORMS;
    const varyingConfig = vanish_consts_1.VANISH_VARYINGS;
    const requiredFunctions = vanish_consts_1.VANISH_FUNCTIONS;
    const attributeConfig = vanish_consts_1.VANISH_ATTRIBUTES;
    const { transformation } = (0, vanishTransform_1.vanishTransform)(formattedEffectParams);
    return {
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
        attributeConfig,
    };
};
exports.vanishEffect = vanishEffect;
