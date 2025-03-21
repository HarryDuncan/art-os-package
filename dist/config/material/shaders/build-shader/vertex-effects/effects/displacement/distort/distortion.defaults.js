"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_DISTORTION_EFFECT_PARAMETERS = exports.DEFAULT_DISTORT_ATTRIBUTES = exports.DEFAULT_DISTORT_FUNCTIONS = exports.DEFAULT_DISTORT_VARYINGS = exports.DEFAULT_DISTORT_UNIFORMS = void 0;
const distortion_1 = require("../../../../shader-properties/functions/distortion/distortion");
exports.DEFAULT_DISTORT_UNIFORMS = {
    defaultUniforms: [],
    customUniforms: [],
};
exports.DEFAULT_DISTORT_VARYINGS = [
    { id: "vPosition", valueType: "VEC3", varyingType: "DEFAULT" },
    {
        id: "vNormal",
        valueType: "VEC3",
        varyingType: "CUSTOM",
        value: "twistedNormal.xyz",
    },
];
exports.DEFAULT_DISTORT_FUNCTIONS = [
    { id: "twister", functionDefinition: distortion_1.twisterDistortion },
];
exports.DEFAULT_DISTORT_ATTRIBUTES = [];
exports.DEFAULT_DISTORTION_EFFECT_PARAMETERS = {};
