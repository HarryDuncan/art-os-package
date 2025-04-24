import { Vector2, Vector3 } from "three";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../../../../../../consts/materials/shader.consts";
import {
  brdfGgx,
  brdfLambert,
  computeMultiScattering,
  dfgApprox,
  dGGX,
  fSchlickVector,
  getDistanceAttenuation,
  getLightProbeIrradiance,
  indirectDiffusePhysical,
  indirectSpecularPhysical,
  inverseTransformDirection,
  linearToneMapping,
  linearTosRGB,
  pointLightInfo,
  redirectPhysicalLight,
  shGetIrradianceAt,
  vGGXSmithCorrelated,
} from "../../../../shader-properties/functions/lighting/light";
import {
  calculateNormal,
  interpolate,
  mod289Vec4,
  normSin,
  permuteVec4,
  pow2,
  taylorInvSqrtVec4,
} from "../../../../shader-properties/functions/maths/maths";
import { VARYING_TYPES } from "../../../../shader-properties/varyings/varyings.consts";
import {
  displaceByNoise,
  fitPosition,
  frostedTips,
  sinNoise,
  smoothMod,
  transition,
  wavePattern,
} from "../../../../shader-properties/functions/distortion/distortion";
import {
  fade,
  transitionalNoise,
} from "../../../../shader-properties/functions/noise/noise";
import {
  UniformConfig,
  ShaderFunction,
  VaryingConfig,
  StructConfig,
} from "../../../../../../../../types/materials/shaders/buildShader.types";

export const PHYSICAL_MATERIAL_UNIFORM_CONFIG = {
  defaultUniforms: ["uResolution"],
  customUniforms: [
    {
      id: "uToneMappingExposure",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: 0.3,
    },
    {
      id: "uSpecularIntensity",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: 1.0,
    },
    {
      id: "uRoughness",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: 1.0,
    },
    {
      id: "uMetalness",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: 0.0,
    },
    {
      id: "uOpacity",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: 1.0,
    },
    { id: "uIor", valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT },
    {
      id: "uDiffuse",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
      value: new Vector3(0.2, 0.5, 0.5),
    },
    {
      id: "uEmissive",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
      value: new Vector3(0.0, 0.0, 1.0),
    },
    {
      id: "uSpecularColor",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
      value: new Vector3(0.0, 0.0, 1.0),
    },
    {
      id: "uDirection",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
      value: new Vector2(0.5, 0.5),
    },
    {
      id: "uSmoothness",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: 0.5,
    },
    {
      id: "uSinColor",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
      value: new Vector3(1.0, 0.0, 1.0),
    },
    {
      id: "uSinBrightness",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: 1.0,
    },
    { id: "uAmbientLightColor", valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3 },
    {
      id: "uPointLight",
      valueType: SHADER_PROPERTY_VALUE_TYPES.STRUCT,
      arrayLength: 2,
      structProperties: {
        id: "PointLight",
        properties: [
          {
            id: "position",
            valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
            value: new Vector3(3.0, 3.0, 3.0),
          },
          {
            id: "color",
            valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
            value: new Vector3(1.0, 5.0, 5.0),
          },
          {
            id: "distance",
            valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
            value: 1.0,
          },
          { id: "decay", valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT },
        ],
      },
    },
    {
      id: "uLightProbe",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
      arrayLength: 9,
      value: new Vector3(1, 0.5, 0.5),
    },
    {
      id: "uInColor",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
      value: new Vector3(1, 0.5, 0.5),
    },

    // Move these uniforms to distortion/transition effect
    {
      id: "uDensity",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: 0.5,
    },
  ],
} as UniformConfig;

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
] as ShaderFunction[];

export const PHYSICAL_MATERIAL_VARYING_CONFIG = [
  {
    id: "vUv",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
    varyingType: VARYING_TYPES.DEFAULT,
  },
  {
    id: "vPosition",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  },
  {
    id: "vModelViewMatrix",
    varyingType: VARYING_TYPES.DEFAULT,
    attributeKey: "modelViewMatrix",
    valueType: SHADER_PROPERTY_VALUE_TYPES.MAT4,
  },
  {
    id: "vEye",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  },
  {
    id: "vDisplacement",
    varyingType: VARYING_TYPES.CUSTOM,
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 0.5,
  },
] as VaryingConfig[];

export const PHYSICAL_MATERIAL_STRUCT_CONFIG = [
  {
    id: "ReflectedLight",
    properties: [
      { id: "directDiffuse", valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3 },
      { id: "directSpecular", valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3 },
      { id: "indirectDiffuse", valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3 },
      { id: "indirectSpecular", valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3 },
    ],
  },
  {
    id: "PhysicalMaterial",
    properties: [
      { id: "diffuseColor", valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3 },
      { id: "roughness", valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT },
      { id: "specularColor", valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3 },
      { id: "specularF90", valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT },
      { id: "ior", valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT },
    ],
  },
  {
    id: "GeometricContext",
    properties: [
      { id: "position", valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3 },
      { id: "normal", valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3 },
      { id: "viewDir", valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3 },
    ],
  },
  {
    id: "IncidentLight",
    properties: [
      { id: "color", valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3 },
      { id: "direction", valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3 },
      { id: "visible", valueType: SHADER_PROPERTY_VALUE_TYPES.BOOL },
    ],
  },
  {
    id: "PointLight",
    properties: [
      { id: "position", valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3 },
      { id: "color", valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3 },
      { id: "distance", valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT },
      { id: "decay", valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT },
    ],
  },
] as StructConfig[];
