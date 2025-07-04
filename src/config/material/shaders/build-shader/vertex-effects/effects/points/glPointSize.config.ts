import { ShaderTransformationConfig } from "../../../../../../../types/materials/index";
import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../constants/shader.consts";
import { VARYING_TYPES } from "../../../shader-properties/varyings/varyings.consts";
import { ParameterConfig } from "../../../buildShader.types";
import { SHADER_VARIABLE_TYPES } from "../../../constants";
import { MESH_TRANSFORM_TYPE } from "../../../../../../mesh/mesh.consts";
import { MeshTransformConfig } from "../../../../../../../types/config.types";
import {
  randomFloatFunction,
  randFunction,
  noiseFunction,
} from "../../../shader-properties/static-functions";

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
  ...IMAGE_TO_POINTS_VARYING_CONFIG,
] as ParameterConfig[];

export const IMAGE_TO_POINTS_REQUIRED_FUNCTIONS = [];

const imageToPointsTransformConfig = [
  {
    id: "getPointSize",
    transformCode: [
      `float currentPointSize = {{pointSize}};`,
      `return currentPointSize;`,
    ],
    returnValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    assignedVariableId: SHADER_VARIABLE_TYPES.GL_POINT_SIZE,
  },
] as unknown as ShaderTransformationConfig[];

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
  transformationConfig: imageToPointsTransformConfig,
};
