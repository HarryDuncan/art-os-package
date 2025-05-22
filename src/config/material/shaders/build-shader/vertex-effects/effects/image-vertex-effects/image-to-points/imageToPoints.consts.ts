import {
  AttributeConfig,
  UniformConfig,
  VaryingConfig,
} from "../../../../../../../../types/materials/index";
import {
  ASSET_MAPPING_RELATIONSHIPS,
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../../constants/shader.consts";
import { VARYING_TYPES } from "../../../../shader-properties/varyings/varyings.consts";
import {
  randFunction,
  randomFloatFunction,
} from "../../../../shader-properties/functions/random";
import { noiseFunction } from "../../../../shader-properties/functions/noise";
import { QUAD_MESH_TRANSFORM } from "../../../../../../../mesh/meshTransforms.consts";

export const IMAGE_TO_POINTS_UNIFORMS = [
  {
    id: "uTexture",
    valueType: SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D,
    value: null,
    configLocked: true,
    isAssetMapped: true,
    relationship: ASSET_MAPPING_RELATIONSHIPS.TEXTURE,
  },
  {
    id: "uTextureSize",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
    value: null,
    configLocked: true,
    isAssetMapped: true,
    relationship: ASSET_MAPPING_RELATIONSHIPS.DIMENSION,
  },
  {
    id: "uRandom",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 1,
    configLocked: true,
  },
  {
    id: "uDepth",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 1,
    configLocked: true,
  },
  {
    id: "uSize",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 1,
    configLocked: true,
  },
] as unknown as UniformConfig[];

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
    id: "pointIndex",
    configLocked: true,
    attributeValueType: ATTRIBUTE_VALUE_TYPES.INDEXED,
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    assetId: "",
  },
] as AttributeConfig[];

export const IMAGE_TO_POINTS_EFFECT_CONFIG = {
  uniforms: IMAGE_TO_POINTS_UNIFORMS,
  attributes: IMAGE_TO_POINTS_ATTRIBUTES,
  functions: IMAGE_TO_POINTS_REQUIRED_FUNCTIONS,
  varyings: IMAGE_TO_POINTS_VARYING_CONFIG,
  meshTransformConfig: [QUAD_MESH_TRANSFORM],
  parameters: [],
};
