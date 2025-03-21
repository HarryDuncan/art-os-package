import { Vector2, Vector3 } from "three";
import { ShaderPropertyValueTypes } from "../../../../constants";
import { brdfGgx, brdfLambert, computeMultiScattering, dfgApprox, dGGX, fSchlickVector, getDistanceAttenuation, getLightProbeIrradiance, indirectDiffusePhysical, indirectSpecularPhysical, inverseTransformDirection, linearToneMapping, linearTosRGB, pointLightInfo, redirectPhysicalLight, shGetIrradianceAt, vGGXSmithCorrelated, } from "../../../../shader-properties/functions/lighting/light";
import { calculateNormal, interpolate, mod289Vec4, normSin, permuteVec4, pow2, taylorInvSqrtVec4, } from "../../../../shader-properties/functions/maths/maths";
import { VARYING_TYPES } from "../../../../shader-properties/varyings/varyings.consts";
import { displaceByNoise, fitPosition, frostedTips, sinNoise, smoothMod, transition, wavePattern, } from "../../../../shader-properties/functions/distortion/distortion";
import { fade, transitionalNoise, } from "../../../../shader-properties/functions/noise/noise";
export const PHYSICAL_MATERIAL_UNIFORM_CONFIG = {
    defaultUniforms: ["uResolution"],
    customUniforms: [
        {
            id: "uToneMappingExposure",
            valueType: ShaderPropertyValueTypes.FLOAT,
            value: 0.3,
        },
        {
            id: "uSpecularIntensity",
            valueType: ShaderPropertyValueTypes.FLOAT,
            value: 1.0,
        },
        { id: "uRoughness", valueType: ShaderPropertyValueTypes.FLOAT, value: 1.0 },
        { id: "uMetalness", valueType: ShaderPropertyValueTypes.FLOAT, value: 0.0 },
        { id: "uOpacity", valueType: ShaderPropertyValueTypes.FLOAT, value: 1.0 },
        { id: "uIor", valueType: ShaderPropertyValueTypes.FLOAT },
        {
            id: "uDiffuse",
            valueType: ShaderPropertyValueTypes.VEC3,
            value: new Vector3(0.2, 0.5, 0.5),
        },
        {
            id: "uEmissive",
            valueType: ShaderPropertyValueTypes.VEC3,
            value: new Vector3(0.0, 0.0, 1.0),
        },
        {
            id: "uSpecularColor",
            valueType: ShaderPropertyValueTypes.VEC3,
            value: new Vector3(0.0, 0.0, 1.0),
        },
        {
            id: "uDirection",
            valueType: ShaderPropertyValueTypes.VEC2,
            value: new Vector2(0.5, 0.5),
        },
        {
            id: "uSmoothness",
            valueType: ShaderPropertyValueTypes.FLOAT,
            value: 0.5,
        },
        {
            id: "uSinColor",
            valueType: ShaderPropertyValueTypes.VEC3,
            value: new Vector3(1.0, 0.0, 1.0),
        },
        {
            id: "uSinBrightness",
            valueType: ShaderPropertyValueTypes.FLOAT,
            value: 1.0,
        },
        { id: "uAmbientLightColor", valueType: ShaderPropertyValueTypes.VEC3 },
        {
            id: "uPointLight",
            valueType: ShaderPropertyValueTypes.STRUCT,
            arrayLength: 2,
            structProperties: {
                id: "PointLight",
                properties: [
                    {
                        id: "position",
                        valueType: ShaderPropertyValueTypes.VEC3,
                        value: new Vector3(3.0, 3.0, 3.0),
                    },
                    {
                        id: "color",
                        valueType: ShaderPropertyValueTypes.VEC3,
                        value: new Vector3(1.0, 5.0, 5.0),
                    },
                    {
                        id: "distance",
                        valueType: ShaderPropertyValueTypes.FLOAT,
                        value: 1.0,
                    },
                    { id: "decay", valueType: ShaderPropertyValueTypes.FLOAT },
                ],
            },
        },
        {
            id: "uLightProbe",
            valueType: ShaderPropertyValueTypes.VEC3,
            arrayLength: 9,
            value: new Vector3(1, 0.5, 0.5),
        },
        {
            id: "uInColor",
            valueType: ShaderPropertyValueTypes.VEC3,
            value: new Vector3(1, 0.5, 0.5),
        },
        // Move these uniforms to distortion/transition effect
        { id: "uDensity", valueType: ShaderPropertyValueTypes.FLOAT, value: 0.5 },
    ],
};
export const DEFAULT_PHYSICAL_MATERIAL_EFFECT_PROPS = {};
export const PHYSICAL_MATERIAL_REQUIRED_FUNCTIONS = [
    { id: "calculateNormal", functionDefinition: calculateNormal },
    { id: "pow2", functionDefinition: pow2 },
    { id: "brdfLambert", functionDefinition: brdfLambert },
    { id: "fSchlickVector", functionDefinition: fSchlickVector },
    { id: "vGGXSmithCorrelated", functionDefinition: vGGXSmithCorrelated },
    { id: "dGGX", functionDefinition: dGGX },
    { id: "brdfGgx", functionDefinition: brdfGgx },
    { id: "getDistanceAttenuation", functionDefinition: getDistanceAttenuation },
    { id: "getPointLightInfo", functionDefinition: pointLightInfo },
    {
        id: "inverseTransformDirection",
        functionDefinition: inverseTransformDirection,
    },
    { id: "shGetIrradianceAt", functionDefinition: shGetIrradianceAt },
    {
        id: "getLightProbeIrradiance",
        functionDefinition: getLightProbeIrradiance,
    },
    {
        id: "indirectDiffusePhysical",
        functionDefinition: indirectDiffusePhysical,
    },
    { id: "dfgApprox", functionDefinition: dfgApprox },
    { id: "computeMultiScattering", functionDefinition: computeMultiScattering },
    {
        id: "indirectSpecularPhysical",
        functionDefinition: indirectSpecularPhysical,
    },
    { id: "linearToneMapping", functionDefinition: linearToneMapping },
    { id: "linearTosRGB", functionDefinition: linearTosRGB },
    { id: "redirectPhysicalLight", functionDefinition: redirectPhysicalLight },
    // TODO - move to it's own distortion effect
    { id: "smoothMod", functionDefinition: smoothMod },
    { id: "fitPosition", functionDefinition: fitPosition },
    { id: "fade", functionDefinition: fade },
    { id: "mod", functionDefinition: mod289Vec4 },
    { id: "permute", functionDefinition: permuteVec4 },
    { id: "wavePattern", functionDefinition: wavePattern },
    { id: "fade", functionDefinition: fade },
    { id: "taylorInvSqrt", functionDefinition: taylorInvSqrtVec4 },
    { id: "transitionalNoise", functionDefinition: transitionalNoise },
    { id: "displaceByNoise", functionDefinition: displaceByNoise },
    { id: "normSin", functionDefinition: normSin },
    { id: "interpolate", functionDefinition: interpolate },
    { id: "sinNoise", functionDefinition: sinNoise },
    { id: "frostedTips", functionDefinition: frostedTips },
    { id: "transition", functionDefinition: transition },
];
export const PHYSICAL_MATERIAL_VARYING_CONFIG = [
    {
        id: "vUv",
        valueType: ShaderPropertyValueTypes.VEC2,
        varyingType: VARYING_TYPES.DEFAULT,
    },
    {
        id: "vPosition",
        varyingType: VARYING_TYPES.DEFAULT,
        valueType: ShaderPropertyValueTypes.VEC3,
    },
    {
        id: "vModelViewMatrix",
        varyingType: VARYING_TYPES.DEFAULT,
        attributeKey: "modelViewMatrix",
        valueType: ShaderPropertyValueTypes.MAT4,
    },
    {
        id: "vEye",
        varyingType: VARYING_TYPES.DEFAULT,
        valueType: ShaderPropertyValueTypes.VEC3,
    },
    {
        id: "vDisplacement",
        varyingType: VARYING_TYPES.CUSTOM,
        valueType: ShaderPropertyValueTypes.FLOAT,
        value: 0.5,
    },
];
export const PHYSICAL_MATERIAL_STRUCT_CONFIG = [
    {
        id: "ReflectedLight",
        properties: [
            { id: "directDiffuse", valueType: ShaderPropertyValueTypes.VEC3 },
            { id: "directSpecular", valueType: ShaderPropertyValueTypes.VEC3 },
            { id: "indirectDiffuse", valueType: ShaderPropertyValueTypes.VEC3 },
            { id: "indirectSpecular", valueType: ShaderPropertyValueTypes.VEC3 },
        ],
    },
    {
        id: "PhysicalMaterial",
        properties: [
            { id: "diffuseColor", valueType: ShaderPropertyValueTypes.VEC3 },
            { id: "roughness", valueType: ShaderPropertyValueTypes.FLOAT },
            { id: "specularColor", valueType: ShaderPropertyValueTypes.VEC3 },
            { id: "specularF90", valueType: ShaderPropertyValueTypes.FLOAT },
            { id: "ior", valueType: ShaderPropertyValueTypes.FLOAT },
        ],
    },
    {
        id: "GeometricContext",
        properties: [
            { id: "position", valueType: ShaderPropertyValueTypes.VEC3 },
            { id: "normal", valueType: ShaderPropertyValueTypes.VEC3 },
            { id: "viewDir", valueType: ShaderPropertyValueTypes.VEC3 },
        ],
    },
    {
        id: "IncidentLight",
        properties: [
            { id: "color", valueType: ShaderPropertyValueTypes.VEC3 },
            { id: "direction", valueType: ShaderPropertyValueTypes.VEC3 },
            { id: "visible", valueType: ShaderPropertyValueTypes.BOOL },
        ],
    },
    {
        id: "PointLight",
        properties: [
            { id: "position", valueType: ShaderPropertyValueTypes.VEC3 },
            { id: "color", valueType: ShaderPropertyValueTypes.VEC3 },
            { id: "distance", valueType: ShaderPropertyValueTypes.FLOAT },
            { id: "decay", valueType: ShaderPropertyValueTypes.FLOAT },
        ],
    },
];
