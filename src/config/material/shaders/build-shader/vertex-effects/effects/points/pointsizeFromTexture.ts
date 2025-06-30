import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../constants/shader.consts";
import { SHADER_VARIABLE_TYPES } from "../../../constants";
import { MESH_TRANSFORM_TYPE } from "../../../../../../mesh/mesh.consts";
import {
  MeshTransformConfig,
  ParameterConfig,
} from "../../../../../../../types";
import {
  randFunction,
  randomFloatFunction,
} from "../../../shader-properties/static-functions/random";
import { noiseFunction } from "../../../shader-properties/static-functions/noise";

export const POINT_SIZE_FROM_TEXTURE_TRANSFORM = {
  id: "pointSizeFromTexture",
  returnValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  assignedVariableId: SHADER_VARIABLE_TYPES.GL_POINT_SIZE,
  effectCode: [
    `vec4 color = {{getTexturePointColor}}`,
    `float grey = color.r + color.g + color.b;`,
    `float currentPointSize = (noise(vec2(uTime, {{pointIndex}}) * 0.5) + 2.0);`,
    `float size = 0.0;`,
    `if( grey < 2.5 )`,
    `{`,
    `size = 1.0 ;`,
    `};`,
  ],
};

export const IMAGE_TO_POINTS_PARAMETERS = [
  {
    id: "pointSize",
    name: "Point Size",
    description: "The size of the points",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 10,
    configLocked: true,
  },
] as ParameterConfig[];

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

export const IMAGE_TO_POINTS_REQUIRED_FUNCTIONS = [
  randomFloatFunction,
  randFunction,
  noiseFunction,
];

const IMAGE_TO_POINTS_MESH_TRANSFORM = {
  id: "pointSizeMeshTransform",
  type: MESH_TRANSFORM_TYPE.CUSTOM_ATTRIBUTES,
  transformedMeshIds: [],
  materialId: "",
  transformParameterConfigs: [...IMAGE_TO_POINTS_ATTRIBUTES],
} as unknown as MeshTransformConfig;

export const POINT_SIZE_EFFECT_CONFIG = {
  functions: IMAGE_TO_POINTS_REQUIRED_FUNCTIONS,
  meshTransformConfig: [IMAGE_TO_POINTS_MESH_TRANSFORM],
  parameters: IMAGE_TO_POINTS_PARAMETERS,
  transformationConfig: POINT_SIZE_FROM_TEXTURE_TRANSFORM,
};
