import { ShaderTransformationConfig } from "../../../../../../types/materials/index";
import {
  ASSET_MAPPING_RELATIONSHIPS,
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../constants/shader.consts";
import { VARYING_TYPES } from "../../shader-properties/varyings/varyings.consts";
import {
  randFunction,
  randomFloatFunction,
} from "../../shader-properties/functions/random";
import { noiseFunction } from "../../shader-properties/functions/noise";
import { QUAD_MESH_TRANSFORM } from "../../../../../mesh/meshTransforms.consts";
import { ParameterConfig } from "../../buildShader.types";
import { SHADER_VARIABLE_TYPES } from "../../constants";

// {
//   id: "vPixelColor",
//   name: "Pixel Color",
//   configLocked: true,
//   description: "The color of the texture at the current pixel",
//   valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
//   isVarying: true,
//   varyingConfig: {
//     varyingType: VARYING_TYPES.CUSTOM,
//     valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
//     value: `texturePointColor`,
//   },
// },
export const IMAGE_TO_POINTS_VARYING_CONFIG = [
  {
    id: "vUv",
    name: "UV",
    configLocked: true,
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
    description: "The UV coordinates of the texture",
    isVarying: true,
    varyingConfig: {
      varyingType: VARYING_TYPES.DEFAULT,
      attributeKey: "uv",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
    },
  },
];

export const IMAGE_TO_POINTS_ATTRIBUTES = [
  {
    id: "pointIndex",
    name: "Point Index",
    description: "Creates an index of each point of the mesh",
    configLocked: true,
    isAttribute: true,
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    attributeConfig: {
      attributeValueType: ATTRIBUTE_VALUE_TYPES.INDEXED,
      assetId: "",
    },
  },
] as ParameterConfig[];

export const IMAGE_TO_POINTS_PARAMETERS = [
  {
    id: "pointSize",
    name: "Point Size",
    description: "The size of the points",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 10,
    configLocked: true,
  },
  {
    id: "convertedTexture",
    name: "Converted Texture",
    description: "The texture to convert to points",
    valueType: SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D,
    value: null,
    configLocked: true,
    isAssetMapped: true,
    assetMappingConfig: {
      relationship: ASSET_MAPPING_RELATIONSHIPS.TEXTURE,
    },
  },
  {
    id: "textureSize",
    name: "TextureSize",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
    value: null,
    configLocked: true,
    isAssetMapped: true,
    assetMappingConfig: {
      relationship: ASSET_MAPPING_RELATIONSHIPS.DIMENSION,
    },
  },
  {
    id: "randomDirection",
    name: "Random",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 1,
    configLocked: true,
  },
  {
    id: "pointDepth",
    name: "Depth",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 1,
    configLocked: true,
  },
  ...IMAGE_TO_POINTS_ATTRIBUTES,
  ...IMAGE_TO_POINTS_VARYING_CONFIG,
] as ParameterConfig[];

export const IMAGE_TO_POINTS_REQUIRED_FUNCTIONS = [
  randomFloatFunction,
  randFunction,
  noiseFunction,
];

const imageToPointsTransformConfig = [
  {
    id: "getPointSize",
    functionContent: [
      `vec4 color = {{getTexturePointColor}}`,
      `float grey = color.r * 0.2 + color.g * 0.71 + color.b * 0.07;`,
      `float currentPointSize = (noise(vec2(uTime, {{pointIndex}}) * 0.5) + 2.0);`,
      `float size = 0.0;`,
      `if( grey < 0.9 )`,
      `{`,
      `size = 12.4 ;`,
      `};`,
      `currentPointSize *= min(grey, size);`,
      `currentPointSize *= {{pointSize}};`,
      `return currentPointSize;`,
    ],
    returnValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    shaderVariableType: SHADER_VARIABLE_TYPES.GL_POINT_SIZE,
  },
  {
    id: "getTexturePointColor",
    functionContent: [
      `vec2 puv = {{pointPosition}}.xy / {{textureSize}};`,
      `vec4 color = texture2D({{convertedTexture}}, puv);`,
      `return color;`,
    ],
    returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  },
  {
    id: "textureToPoints",
    functionContent: [
      // double check that point position is correct
      // if there are issues it may be because you are passing in altered points
      `vec4 texturePointColor = {{getTexturePointColor}}`,
      `float grey = texturePointColor.r * 0.2 + texturePointColor.g * 0.71 + texturePointColor.b * 0.07;`,
      `vec3 displaced = {{pointOffset}};`,
      // randomise
      `displaced.xy += vec2(random({{pointIndex}}) - 0.5, random({{pointIndex}}) - 0.5) * {{randomDirection}};`,
      `float rndz = (random({{pointIndex}}) + noise(vec2({{pointIndex}} * 0.1, uTime * 0.1)));`,
      `displaced.z += rndz * (random({{pointIndex}}) * 2.0 * {{pointDepth}});`,
      // center
      `displaced.xy -= {{textureSize}} * 0.5;`,
      // particle size
      `{{pointPosition}} = vec4(displaced, 1.0);`,
      `return {{pointPosition}};`,
    ],
    returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    shaderVariableType: SHADER_VARIABLE_TYPES.VERTEX_POINT,
  },
] as unknown as ShaderTransformationConfig[];

export const IMAGE_TO_POINTS_EFFECT_CONFIG = {
  functions: IMAGE_TO_POINTS_REQUIRED_FUNCTIONS,
  meshTransformConfig: [QUAD_MESH_TRANSFORM],
  parameters: IMAGE_TO_POINTS_PARAMETERS,
  transformationConfig: imageToPointsTransformConfig,
};
