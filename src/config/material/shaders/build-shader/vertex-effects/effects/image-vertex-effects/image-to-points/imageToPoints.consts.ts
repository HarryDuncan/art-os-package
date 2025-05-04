import {
  UniformConfig,
  VaryingConfig,
} from "../../../../../../../../types/materials/shaders/buildShader.types";
import { IMAGE_VERTEX_EFFECT } from "../../../../../../../../consts/materials/vertexEffects.consts";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../../../../../../consts";
import { VARYING_TYPES } from "../../../../shader-properties/varyings/varyings.consts";
import {
  randFunction,
  randomFloatFunction,
} from "../../../../shader-properties/functions/random";
import { noiseFunction } from "../../../../shader-properties/functions/noise";

export const DEFAULT_IMAGE_TO_POINTS_EFFECT_PROPS = {
  declareInTransform: true,
  effectType: IMAGE_VERTEX_EFFECT.IMAGE_TO_POINTS,
  effectProps: {},
};

export const IMAGE_TO_POINTS_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [
    { id: "uTextureSize", valueType: "VEC2", value: [1, 1], idLocked: true },
    { id: "uRandom", valueType: "FLOAT", value: 1, idLocked: true },
    { id: "uDepth", valueType: "FLOAT", value: 1, idLocked: true },
    { id: "uSize", valueType: "FLOAT", value: 1, idLocked: true },
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
export const IMAGE_TO_POINTS_ATTRIBUTE_CONFIG = [];
