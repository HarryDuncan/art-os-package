"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMAGE_AS_MASK_UNIFORMS = exports.IMAGE_AS_MASK_ATTRIBUTES = exports.IMAGE_AS_MASK_FUNCTIONS = exports.IMAGE_AS_MASK_VARYINGS = exports.DEFAULT_IMAGE_AS_MASK_PROPS = void 0;
const constants_1 = require("../../../constants");
const varyings_consts_1 = require("../../../shader-properties/varyings/varyings.consts");
exports.DEFAULT_IMAGE_AS_MASK_PROPS = {};
exports.IMAGE_AS_MASK_VARYINGS = [
    {
        id: "vHidePixel",
        varyingType: varyings_consts_1.VARYING_TYPES.CUSTOM,
        valueType: constants_1.ShaderPropertyValueTypes.FLOAT,
    },
];
exports.IMAGE_AS_MASK_FUNCTIONS = [];
exports.IMAGE_AS_MASK_ATTRIBUTES = [];
exports.IMAGE_AS_MASK_UNIFORMS = {
    defaultUniforms: [],
    customUniforms: [],
};
