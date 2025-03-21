"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOISE_FUNCTIONS = exports.DEFAULT_NOISE_PARAMETERS = exports.NOISE_VARYINGS = exports.VORONOI_UNIFORMS = exports.NOISE_UNIFORMS = exports.NOISE_EFFECT_TYPES = void 0;
const noise3d_1 = require("../../../../shader-properties/functions/noise/noise3d");
exports.NOISE_EFFECT_TYPES = {
    PERLIN: "PERLIN",
    NORMAL: "NORMAL",
    VORONOI: "VORONOI",
};
exports.NOISE_UNIFORMS = {
    defaultUniforms: [],
    customUniforms: [{ id: "uNoiseStrength", valueType: "FLOAT", value: 1.0 }],
};
exports.VORONOI_UNIFORMS = {
    defaultUniforms: [],
    customUniforms: [
        { id: "uFrequency", valueType: "FLOAT", value: 2.0 },
        { id: "uNoiseStrength", valueType: "FLOAT", value: 0.0 },
        { id: "uNormalOffset", valueType: "FLOAT", value: 1.0 },
    ],
};
exports.NOISE_VARYINGS = [
    { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
];
exports.DEFAULT_NOISE_PARAMETERS = {
    noiseType: exports.NOISE_EFFECT_TYPES.NORMAL,
    effectStrength: 1.0,
};
exports.NOISE_FUNCTIONS = [{ id: "noise", functionDefinition: noise3d_1.noise3D }];
