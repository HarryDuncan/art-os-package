import {
  ASSET_MAPPING_RELATIONSHIPS,
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../constants/shader.consts";
import { SHADER_VARIABLE_TYPES } from "../../../constants";
import { MESH_TRANSFORM_TYPE } from "../../../../../../mesh/mesh.consts";
import {
  MeshTransformConfig,
  ParameterConfig,
  ShaderTransformationConfig,
} from "../../../../../../../types";
import {
  randFunction,
  randomFloatFunction,
} from "../../../shader-properties/static-functions/random";
import { noiseFunction } from "../../../shader-properties/static-functions/noise";

export const POINT_SIZE_FROM_TEXTURE_TRANSFORM = [
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
    id: "pointSizeFromTexture",
    returnValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    assignedVariableId: SHADER_VARIABLE_TYPES.GL_POINT_SIZE,
    transformCode: [
      `vec4 color = {{getTexturePointColor}}`,
      `float grey = color.r + color.g + color.b;`,
      `float currentPointSize = (noise(vec2(uTime, {{pointIndex}}) * 0.5) + 2.0);`,
      `float size = 0.0;`,
      `if( grey < 2.5 )`,
      `{`,
      `size = 1.0 ;`,
      `};`,
      `currentPointSize *= size;`,
      `currentPointSize *= {{pointSize}};`,
      `return currentPointSize;`,
    ],
  },
] as ShaderTransformationConfig[];

export const POINT_SIZE_FROM_TEXTURE_PARAMETERS = [
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
] as ParameterConfig[];

export const POINT_SIZE_FROM_TEXTURE_ATTRIBUTES = [
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

export const POINT_SIZE_FROM_TEXTURE_REQUIRED_FUNCTIONS = [
  randomFloatFunction,
  randFunction,
  noiseFunction,
];

const POINT_SIZE_FROM_TEXTURE_MESH_TRANSFORM = {
  id: "pointSizeMeshTransform",
  type: MESH_TRANSFORM_TYPE.CUSTOM_ATTRIBUTES,
  transformedMeshIds: [],
  materialId: "",
  transformParameterConfigs: [...POINT_SIZE_FROM_TEXTURE_ATTRIBUTES],
} as unknown as MeshTransformConfig;

export const POINT_SIZE_EFFECT_CONFIG = {
  functions: POINT_SIZE_FROM_TEXTURE_REQUIRED_FUNCTIONS,
  meshTransformConfig: [POINT_SIZE_FROM_TEXTURE_MESH_TRANSFORM],
  parameters: POINT_SIZE_FROM_TEXTURE_PARAMETERS,
  transformationConfig: POINT_SIZE_FROM_TEXTURE_TRANSFORM,
};
