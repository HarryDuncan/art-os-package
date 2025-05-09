import {
  AttributeConfig,
  UniformConfig,
  VaryingConfig,
} from "../../../../../../../../types/materials/shaders/buildShader.types";
import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../../../../../../consts/materials/shader.consts";
import { VARYING_TYPES } from "../../../../shader-properties/varyings/varyings.consts";
import {
  randFunction,
  randomFloatFunction,
} from "../../../../shader-properties/functions/random";
import { noiseFunction } from "../../../../shader-properties/functions/noise";

export const IMAGE_TO_POINTS_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [
    {
      id: "uTexture",
      valueType: SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D,
      value: null,
      idLocked: true,
      isAssetMapped: true,
    },
    {
      id: "uTextureSize",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
      value: null,
      idLocked: true,
      isAssetMapped: true,
    },
    {
      id: "uRandom",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: 1,
      idLocked: true,
    },
    {
      id: "uDepth",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: 1,
      idLocked: true,
    },
    {
      id: "uSize",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: 1,
      idLocked: true,
    },
  ],
} as unknown as UniformConfig;

export const IMAGE_TO_POINTS_VARYING_CONFIG = [
  {
    id: "vUv",
    varyingType: VARYING_TYPES.ATTRIBUTE,
    attributeKey: "uv",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
  },
  {
    id: "vPUv",
    varyingType: VARYING_TYPES.CUSTOM,
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
  },
  {
    id: "vPixelColor",
    varyingType: VARYING_TYPES.CUSTOM,
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    value: `colA`,
  },
] as VaryingConfig[];
export const IMAGE_TO_POINTS_REQUIRED_FUNCTIONS = [
  randomFloatFunction,
  randFunction,
  noiseFunction,
];
export const IMAGE_TO_POINTS_ATTRIBUTES = [
  {
    id: "position",
    idLocked: true,
    attributeValueType: ATTRIBUTE_VALUE_TYPES.INDEXED,
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    assetId: "",
  },
] as AttributeConfig[];
