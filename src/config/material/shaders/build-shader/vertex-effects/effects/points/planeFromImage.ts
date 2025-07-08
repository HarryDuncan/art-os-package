import { ShaderTransformationConfig } from "../../../../../../../types/materials/index";
import {
  ASSET_MAPPING_RELATIONSHIPS,
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../constants/shader.consts";
import { VARYING_TYPES } from "../../../shader-properties/varyings/varyings.consts";

import { QUAD_MESH_TRANSFORM } from "../../../../../../mesh/meshTransforms.consts";
import { ParameterConfig } from "../../../buildShader.types";
import {
  SHADER_VARIABLE_ASSIGNMENT_KEYS,
  SHADER_VARIABLE_TYPES,
} from "../../../constants";
import {
  randomFloatFunction,
  randFunction,
  noiseFunction,
} from "../../../shader-properties/static-functions";
import { MESH_TRANSFORM_TYPE } from "../../../../../../mesh/mesh.consts";
import { MeshTransformConfig } from "../../../../../../../types";

export const PLANE_FROM_IMAGE_VARYING_CONFIG = [
  {
    id: "vUv",
    name: "UV",
    configLocked: true,
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
    id: "pointIndex",
    name: "Point Index",
    description: "Creates an index of each point of the mesh",
    configLocked: true,
    parameterType: SHADER_PROPERTY_TYPES.ATTRIBUTE,
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    attributeConfig: {
      attributeValueType: ATTRIBUTE_VALUE_TYPES.INDEXED,
      assetId: "",
    },
  },
] as ParameterConfig[];

export const PLANE_FROM_IMAGE_PARAMETERS = [
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

  ...PLANE_FROM_IMAGE_VARYING_CONFIG,
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
] as unknown as ShaderTransformationConfig[];

const PLANE_FROM_IMAGE_MESH_TRANSFORM = {
  id: "imageToPointsMeshTransform",
  type: MESH_TRANSFORM_TYPE.CUSTOM_ATTRIBUTES,
  transformedMeshIds: [],
  materialId: "",
  transformParameterConfigs: [...PLANE_FROM_IMAGE_ATTRIBUTES],
} as unknown as MeshTransformConfig;

export const PLANE_FROM_IMAGE_EFFECT_CONFIG = {
  functions: PLANE_FROM_IMAGE_REQUIRED_FUNCTIONS,
  meshTransformConfig: [QUAD_MESH_TRANSFORM, PLANE_FROM_IMAGE_MESH_TRANSFORM],
  parameters: PLANE_FROM_IMAGE_PARAMETERS,
  transformationConfig: PLANE_FROM_IMAGE_TRANSFORM_CONFIG,
};
