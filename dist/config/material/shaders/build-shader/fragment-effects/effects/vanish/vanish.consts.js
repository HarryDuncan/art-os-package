"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_VANISH_EFFECT_PARAMS = exports.VANISH_ATTRIBUTES = exports.VANISH_VARYINGS = exports.VANISH_UNIFORMS = exports.VANISH_FUNCTIONS = void 0;
const buildShader_consts_1 = require("../../../constants/buildShader.consts");
const perlinNoise_1 = require("../../../shader-properties/functions/noise/perlinNoise");
const varyings_consts_1 = require("../../../shader-properties/varyings/varyings.consts");
exports.VANISH_FUNCTIONS = [
    { id: "simplePerlinNoise", functionDefinition: perlinNoise_1.simplePerlinNoise },
];
exports.VANISH_UNIFORMS = {
    defaultUniforms: ["uProgress"],
    customUniforms: [
        {
            id: "uNumberOfRings",
            valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT,
            value: 100,
        },
        {
            id: "uSpread",
            valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT,
            value: 0.772,
        },
        {
            id: "uNoise",
            valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT,
            value: 0.18,
        },
        {
            id: "uDisplacement",
            valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT,
            value: 22.0,
        },
    ],
};
exports.VANISH_VARYINGS = [
    {
        id: "vPosition",
        varyingType: varyings_consts_1.VARYING_TYPES.DEFAULT,
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.VEC3,
    },
    {
        id: "vNormal",
        varyingType: varyings_consts_1.VARYING_TYPES.DEFAULT,
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.VEC3,
    },
];
exports.VANISH_ATTRIBUTES = [];
exports.DEFAULT_VANISH_EFFECT_PARAMS = {
    vanishHeight: 3.5,
};
