"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hueShift = void 0;
const colorTransformation_1 = require("../color/colorTransformation");
const hueShift_consts_1 = require("./hueShift.consts");
const hueShift = (effectProps) => {
    const uniformConfig = hueShift_consts_1.DEFAULT_HUE_SHIFT_UNIFORMS;
    const varyingConfig = hueShift_consts_1.DEFAULT_HUE_SHIFT_VARYINGS;
    const requiredFunctions = hueShift_consts_1.DEFAULT_HUE_SHIFT_FUNCTIONS;
    const transformation = (0, colorTransformation_1.colorTransformation)(effectProps);
    return {
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
        attributeConfig: [],
    };
};
exports.hueShift = hueShift;
