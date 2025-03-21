"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MATCAP_VARYINGS = exports.MATCAP_REQUIRED_FUNCTIONS = exports.DEFAULT_MATCAP_EFFECT_PROPS = exports.DEFAULT_MATCAP_UNIFORMS = void 0;
const constants_1 = require("../../../../constants");
const matcapFunctions_1 = require("../../../../shader-properties/functions/matcapFunctions");
const maths_1 = require("../../../../shader-properties/functions/maths/maths");
const varyings_consts_1 = require("../../../../shader-properties/varyings/varyings.consts");
exports.DEFAULT_MATCAP_UNIFORMS = {
    defaultUniforms: ["uMaterial", "uResolution"],
    customUniforms: [
        {
            id: "uLightDir",
            valueType: constants_1.ShaderPropertyValueTypes.VEC2,
        },
    ],
};
exports.DEFAULT_MATCAP_EFFECT_PROPS = {};
exports.MATCAP_REQUIRED_FUNCTIONS = [
    { id: "calculateNormal", functionDefinition: maths_1.calculateNormal },
    { id: "matcap", functionDefinition: matcapFunctions_1.matcapFunction },
    { id: "textureLevel", functionDefinition: matcapFunctions_1.textureLevel },
];
exports.MATCAP_VARYINGS = [
    {
        id: "vEye",
        varyingType: varyings_consts_1.VARYING_TYPES.DEFAULT,
        valueType: constants_1.ShaderPropertyValueTypes.VEC3,
    },
    {
        id: "vPosition",
        varyingType: varyings_consts_1.VARYING_TYPES.DEFAULT,
        valueType: constants_1.ShaderPropertyValueTypes.VEC3,
    },
    {
        id: "vNormal",
        varyingType: varyings_consts_1.VARYING_TYPES.DEFAULT,
        valueType: constants_1.ShaderPropertyValueTypes.VEC3,
    },
    {
        id: "vUv",
        varyingType: varyings_consts_1.VARYING_TYPES.DEFAULT,
        valueType: constants_1.ShaderPropertyValueTypes.VEC2,
    },
];
