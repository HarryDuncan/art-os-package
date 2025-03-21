"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHYSICAL_MATERIAL_STRUCT_CONFIG = exports.PHYSICAL_MATERIAL_VARYING_CONFIG = exports.PHYSICAL_MATERIAL_REQUIRED_FUNCTIONS = exports.DEFAULT_PHYSICAL_MATERIAL_EFFECT_PROPS = exports.PHYSICAL_MATERIAL_UNIFORM_CONFIG = void 0;
const three_1 = require("three");
const constants_1 = require("../../../../constants");
const light_1 = require("../../../../shader-properties/functions/lighting/light");
const maths_1 = require("../../../../shader-properties/functions/maths/maths");
const varyings_consts_1 = require("../../../../shader-properties/varyings/varyings.consts");
const distortion_1 = require("../../../../shader-properties/functions/distortion/distortion");
const noise_1 = require("../../../../shader-properties/functions/noise/noise");
exports.PHYSICAL_MATERIAL_UNIFORM_CONFIG = {
    defaultUniforms: ["uResolution"],
    customUniforms: [
        {
            id: "uToneMappingExposure",
            valueType: constants_1.ShaderPropertyValueTypes.FLOAT,
            value: 0.3,
        },
        {
            id: "uSpecularIntensity",
            valueType: constants_1.ShaderPropertyValueTypes.FLOAT,
            value: 1.0,
        },
        { id: "uRoughness", valueType: constants_1.ShaderPropertyValueTypes.FLOAT, value: 1.0 },
        { id: "uMetalness", valueType: constants_1.ShaderPropertyValueTypes.FLOAT, value: 0.0 },
        { id: "uOpacity", valueType: constants_1.ShaderPropertyValueTypes.FLOAT, value: 1.0 },
        { id: "uIor", valueType: constants_1.ShaderPropertyValueTypes.FLOAT },
        {
            id: "uDiffuse",
            valueType: constants_1.ShaderPropertyValueTypes.VEC3,
            value: new three_1.Vector3(0.2, 0.5, 0.5),
        },
        {
            id: "uEmissive",
            valueType: constants_1.ShaderPropertyValueTypes.VEC3,
            value: new three_1.Vector3(0.0, 0.0, 1.0),
        },
        {
            id: "uSpecularColor",
            valueType: constants_1.ShaderPropertyValueTypes.VEC3,
            value: new three_1.Vector3(0.0, 0.0, 1.0),
        },
        {
            id: "uDirection",
            valueType: constants_1.ShaderPropertyValueTypes.VEC2,
            value: new three_1.Vector2(0.5, 0.5),
        },
        {
            id: "uSmoothness",
            valueType: constants_1.ShaderPropertyValueTypes.FLOAT,
            value: 0.5,
        },
        {
            id: "uSinColor",
            valueType: constants_1.ShaderPropertyValueTypes.VEC3,
            value: new three_1.Vector3(1.0, 0.0, 1.0),
        },
        {
            id: "uSinBrightness",
            valueType: constants_1.ShaderPropertyValueTypes.FLOAT,
            value: 1.0,
        },
        { id: "uAmbientLightColor", valueType: constants_1.ShaderPropertyValueTypes.VEC3 },
        {
            id: "uPointLight",
            valueType: constants_1.ShaderPropertyValueTypes.STRUCT,
            arrayLength: 2,
            structProperties: {
                id: "PointLight",
                properties: [
                    {
                        id: "position",
                        valueType: constants_1.ShaderPropertyValueTypes.VEC3,
                        value: new three_1.Vector3(3.0, 3.0, 3.0),
                    },
                    {
                        id: "color",
                        valueType: constants_1.ShaderPropertyValueTypes.VEC3,
                        value: new three_1.Vector3(1.0, 5.0, 5.0),
                    },
                    {
                        id: "distance",
                        valueType: constants_1.ShaderPropertyValueTypes.FLOAT,
                        value: 1.0,
                    },
                    { id: "decay", valueType: constants_1.ShaderPropertyValueTypes.FLOAT },
                ],
            },
        },
        {
            id: "uLightProbe",
            valueType: constants_1.ShaderPropertyValueTypes.VEC3,
            arrayLength: 9,
            value: new three_1.Vector3(1, 0.5, 0.5),
        },
        {
            id: "uInColor",
            valueType: constants_1.ShaderPropertyValueTypes.VEC3,
            value: new three_1.Vector3(1, 0.5, 0.5),
        },
        // Move these uniforms to distortion/transition effect
        { id: "uDensity", valueType: constants_1.ShaderPropertyValueTypes.FLOAT, value: 0.5 },
    ],
};
exports.DEFAULT_PHYSICAL_MATERIAL_EFFECT_PROPS = {};
exports.PHYSICAL_MATERIAL_REQUIRED_FUNCTIONS = [
    { id: "calculateNormal", functionDefinition: maths_1.calculateNormal },
    { id: "pow2", functionDefinition: maths_1.pow2 },
    { id: "brdfLambert", functionDefinition: light_1.brdfLambert },
    { id: "fSchlickVector", functionDefinition: light_1.fSchlickVector },
    { id: "vGGXSmithCorrelated", functionDefinition: light_1.vGGXSmithCorrelated },
    { id: "dGGX", functionDefinition: light_1.dGGX },
    { id: "brdfGgx", functionDefinition: light_1.brdfGgx },
    { id: "getDistanceAttenuation", functionDefinition: light_1.getDistanceAttenuation },
    { id: "getPointLightInfo", functionDefinition: light_1.pointLightInfo },
    {
        id: "inverseTransformDirection",
        functionDefinition: light_1.inverseTransformDirection,
    },
    { id: "shGetIrradianceAt", functionDefinition: light_1.shGetIrradianceAt },
    {
        id: "getLightProbeIrradiance",
        functionDefinition: light_1.getLightProbeIrradiance,
    },
    {
        id: "indirectDiffusePhysical",
        functionDefinition: light_1.indirectDiffusePhysical,
    },
    { id: "dfgApprox", functionDefinition: light_1.dfgApprox },
    { id: "computeMultiScattering", functionDefinition: light_1.computeMultiScattering },
    {
        id: "indirectSpecularPhysical",
        functionDefinition: light_1.indirectSpecularPhysical,
    },
    { id: "linearToneMapping", functionDefinition: light_1.linearToneMapping },
    { id: "linearTosRGB", functionDefinition: light_1.linearTosRGB },
    { id: "redirectPhysicalLight", functionDefinition: light_1.redirectPhysicalLight },
    // TODO - move to it's own distortion effect
    { id: "smoothMod", functionDefinition: distortion_1.smoothMod },
    { id: "fitPosition", functionDefinition: distortion_1.fitPosition },
    { id: "fade", functionDefinition: noise_1.fade },
    { id: "mod", functionDefinition: maths_1.mod289Vec4 },
    { id: "permute", functionDefinition: maths_1.permuteVec4 },
    { id: "wavePattern", functionDefinition: distortion_1.wavePattern },
    { id: "fade", functionDefinition: noise_1.fade },
    { id: "taylorInvSqrt", functionDefinition: maths_1.taylorInvSqrtVec4 },
    { id: "transitionalNoise", functionDefinition: noise_1.transitionalNoise },
    { id: "displaceByNoise", functionDefinition: distortion_1.displaceByNoise },
    { id: "normSin", functionDefinition: maths_1.normSin },
    { id: "interpolate", functionDefinition: maths_1.interpolate },
    { id: "sinNoise", functionDefinition: distortion_1.sinNoise },
    { id: "frostedTips", functionDefinition: distortion_1.frostedTips },
    { id: "transition", functionDefinition: distortion_1.transition },
];
exports.PHYSICAL_MATERIAL_VARYING_CONFIG = [
    {
        id: "vUv",
        valueType: constants_1.ShaderPropertyValueTypes.VEC2,
        varyingType: varyings_consts_1.VARYING_TYPES.DEFAULT,
    },
    {
        id: "vPosition",
        varyingType: varyings_consts_1.VARYING_TYPES.DEFAULT,
        valueType: constants_1.ShaderPropertyValueTypes.VEC3,
    },
    {
        id: "vModelViewMatrix",
        varyingType: varyings_consts_1.VARYING_TYPES.DEFAULT,
        attributeKey: "modelViewMatrix",
        valueType: constants_1.ShaderPropertyValueTypes.MAT4,
    },
    {
        id: "vEye",
        varyingType: varyings_consts_1.VARYING_TYPES.DEFAULT,
        valueType: constants_1.ShaderPropertyValueTypes.VEC3,
    },
    {
        id: "vDisplacement",
        varyingType: varyings_consts_1.VARYING_TYPES.CUSTOM,
        valueType: constants_1.ShaderPropertyValueTypes.FLOAT,
        value: 0.5,
    },
];
exports.PHYSICAL_MATERIAL_STRUCT_CONFIG = [
    {
        id: "ReflectedLight",
        properties: [
            { id: "directDiffuse", valueType: constants_1.ShaderPropertyValueTypes.VEC3 },
            { id: "directSpecular", valueType: constants_1.ShaderPropertyValueTypes.VEC3 },
            { id: "indirectDiffuse", valueType: constants_1.ShaderPropertyValueTypes.VEC3 },
            { id: "indirectSpecular", valueType: constants_1.ShaderPropertyValueTypes.VEC3 },
        ],
    },
    {
        id: "PhysicalMaterial",
        properties: [
            { id: "diffuseColor", valueType: constants_1.ShaderPropertyValueTypes.VEC3 },
            { id: "roughness", valueType: constants_1.ShaderPropertyValueTypes.FLOAT },
            { id: "specularColor", valueType: constants_1.ShaderPropertyValueTypes.VEC3 },
            { id: "specularF90", valueType: constants_1.ShaderPropertyValueTypes.FLOAT },
            { id: "ior", valueType: constants_1.ShaderPropertyValueTypes.FLOAT },
        ],
    },
    {
        id: "GeometricContext",
        properties: [
            { id: "position", valueType: constants_1.ShaderPropertyValueTypes.VEC3 },
            { id: "normal", valueType: constants_1.ShaderPropertyValueTypes.VEC3 },
            { id: "viewDir", valueType: constants_1.ShaderPropertyValueTypes.VEC3 },
        ],
    },
    {
        id: "IncidentLight",
        properties: [
            { id: "color", valueType: constants_1.ShaderPropertyValueTypes.VEC3 },
            { id: "direction", valueType: constants_1.ShaderPropertyValueTypes.VEC3 },
            { id: "visible", valueType: constants_1.ShaderPropertyValueTypes.BOOL },
        ],
    },
    {
        id: "PointLight",
        properties: [
            { id: "position", valueType: constants_1.ShaderPropertyValueTypes.VEC3 },
            { id: "color", valueType: constants_1.ShaderPropertyValueTypes.VEC3 },
            { id: "distance", valueType: constants_1.ShaderPropertyValueTypes.FLOAT },
            { id: "decay", valueType: constants_1.ShaderPropertyValueTypes.FLOAT },
        ],
    },
];
