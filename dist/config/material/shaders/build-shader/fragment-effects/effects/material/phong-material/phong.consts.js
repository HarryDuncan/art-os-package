"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHONG_VARYINGS = exports.PHONG_REQUIRED_FUNCTIONS = exports.DEFAULT_PHONG_EFFECT_PROPS = exports.DEFAULT_PHONG_UNIFORMS = void 0;
const three_1 = require("three");
const constants_1 = require("../../../../constants");
const varyings_consts_1 = require("../../../../shader-properties/varyings/varyings.consts");
const uniforms_consts_1 = require("../../../../shader-properties/uniforms/uniforms.consts");
exports.DEFAULT_PHONG_UNIFORMS = {
    defaultUniforms: ["uMaterial", "uResolution"],
    customUniforms: [
        {
            id: "uLightPosition",
            valueType: constants_1.ShaderPropertyValueTypes.VEC3,
            value: new three_1.Vector3(10, 10, 10),
        },
        {
            id: "uDiffuseColor",
            tag: [uniforms_consts_1.UNIFORM_TAGS.COLOR],
            valueType: constants_1.ShaderPropertyValueTypes.VEC3,
            value: new three_1.Vector3(0.2, 0.2, 0.2),
        },
        {
            id: "uLightColor",
            valueType: constants_1.ShaderPropertyValueTypes.VEC3,
            value: new three_1.Vector3(1, 1.0, 1.0),
        },
        {
            id: "uAmbientReflection",
            valueType: constants_1.ShaderPropertyValueTypes.FLOAT,
            value: 0.75,
        },
        {
            id: "uDiffuseReflection",
            valueType: constants_1.ShaderPropertyValueTypes.FLOAT,
            value: 0.9,
        },
        {
            id: "uSpecularReflection",
            valueType: constants_1.ShaderPropertyValueTypes.FLOAT,
            value: 0.7,
        },
        {
            id: "uAmbientColor",
            valueType: constants_1.ShaderPropertyValueTypes.VEC3,
            value: new three_1.Vector3(0.82, 0.92, 0.2),
        },
        {
            id: "uMaterialDiffuse",
            valueType: constants_1.ShaderPropertyValueTypes.VEC3,
            value: new three_1.Vector3(0.5, 0.5, 0.5),
        },
        {
            id: "uSpecularColor",
            valueType: constants_1.ShaderPropertyValueTypes.VEC3,
            value: new three_1.Vector3(1.0, 1.0, 1.0),
        },
        {
            id: "uShininess",
            valueType: constants_1.ShaderPropertyValueTypes.FLOAT,
            value: 20.3,
        },
    ],
};
exports.DEFAULT_PHONG_EFFECT_PROPS = { DEFAULT_PHONG_UNIFORMS: exports.DEFAULT_PHONG_UNIFORMS };
exports.PHONG_REQUIRED_FUNCTIONS = [];
exports.PHONG_VARYINGS = [
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
    {
        id: "vNormalInterpolation",
        varyingType: varyings_consts_1.VARYING_TYPES.DEFAULT,
        valueType: constants_1.ShaderPropertyValueTypes.VEC3,
    },
];
