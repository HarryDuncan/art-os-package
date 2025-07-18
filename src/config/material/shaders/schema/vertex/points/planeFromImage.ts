import { MESH_TRANSFORM_IDS } from "../../mesh-transforms";
import {
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
  VARYING_TYPES,
  ATTRIBUTE_VALUE_TYPES,
  ASSET_MAPPING_RELATIONSHIPS,
  SHADER_VARIABLE_ASSIGNMENT_KEYS,
  SHADER_VARIABLE_TYPES,
} from "../../consts";
import {
  randomFloatFunction,
  randFunction,
  noiseFunction,
} from "../../functions/static-functions";
import { ParameterConfig, ShaderTransformationSchema } from "../../types";

export const PLANE_FROM_IMAGE_VARYING_CONFIG = [
  {
    key: "vUv",
    name: "UV",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
    description: "The UV coordinates of the texture",
    parameterType: SHADER_PROPERTY_TYPES.VARYING,
    varyingConfig: {
      varyingType: VARYING_TYPES.DEFAULT,
      attributeKey: "uv",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
    },
  },
];

export const PLANE_FROM_IMAGE_ATTRIBUTES = [
  {
    key: "pointIndex",
    name: "Point Index",
    description: "Creates an index of each point of the mesh",
    parameterType: SHADER_PROPERTY_TYPES.ATTRIBUTE,
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    attributeConfig: {
      attributeValueType: ATTRIBUTE_VALUE_TYPES.INDEXED,
    },
  },
] as ParameterConfig[];

export const PLANE_FROM_IMAGE_PARAMETERS = [
  {
    key: "convertedTexture",
    name: "Converted Texture",
    description: "The texture to convert to points",
    valueType: SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D,
    value: null,
    isAssetMapped: true,
    assetMappingConfig: {
      relationship: ASSET_MAPPING_RELATIONSHIPS.TEXTURE,
    },
  },
  {
    key: "textureSize",
    name: "TextureSize",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
    value: null,
    isAssetMapped: true,
    assetMappingConfig: {
      relationship: ASSET_MAPPING_RELATIONSHIPS.DIMENSION,
    },
  },
  {
    key: "randomDirection",
    name: "Random",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 1,
  },
  {
    key: "pointDepth",
    name: "Depth",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 1,
  },

  ...PLANE_FROM_IMAGE_VARYING_CONFIG,
  ...PLANE_FROM_IMAGE_ATTRIBUTES,
] as ParameterConfig[];

export const PLANE_FROM_IMAGE_REQUIRED_FUNCTIONS = [
  randomFloatFunction,
  randFunction,
  noiseFunction,
];

export const PLANE_FROM_IMAGE_TRANSFORM_CONFIG = [
  {
    id: "getTexturePointColor",
    transformCode: [
      `vec2 puv = {{pointPosition}}.xy / {{textureSize}};`,
      `vec4 color = texture2D({{convertedTexture}}, puv);`,
      `return color;`,
    ],
    returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  },
  {
    id: "textureToPoints",
    transformCode: [
      // randomise
      //   `{{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}}.xy += vec2(random({{pointIndex}}) - 0.5, random({{pointIndex}}) - 0.5) ;`,
      //  `float rndz = (random({{pointIndex}}) + noise(vec2({{pointIndex}} * 0.1, uTime * 0.1)));`,
      `{{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}}.z +=  (random({{pointIndex}}) * 2.0 * {{pointDepth}}  );`,

      `{{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}}.xy -= {{textureSize}} * 0.5;`,

      `return {{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}};`,
    ],
    returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    assignedVariableId: SHADER_VARIABLE_TYPES.VERTEX_POINT,
  },
] as unknown as ShaderTransformationSchema[];

export const PLANE_FROM_IMAGE_EFFECT_CONFIG = {
  functions: PLANE_FROM_IMAGE_REQUIRED_FUNCTIONS,
  meshTransformIds: [MESH_TRANSFORM_IDS.QUAD],
  parameters: PLANE_FROM_IMAGE_PARAMETERS,
  transformationConfig: PLANE_FROM_IMAGE_TRANSFORM_CONFIG,
  assignedVariableId: SHADER_VARIABLE_TYPES.VERTEX_POINT,
};
