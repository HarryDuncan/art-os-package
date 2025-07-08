import { MESH_TRANSFORM_TYPE } from "../../../../../../mesh/mesh.consts";
import {
  ParameterConfig,
  ShaderTransformationConfig,
} from "../../../buildShader.types";
import {
  SHADER_VARIABLE_ASSIGNMENT_KEYS,
  SHADER_VARIABLE_TYPES,
} from "../../../constants";
import {
  ASSET_MAPPING_RELATIONSHIPS,
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../constants/shader.consts";

const TEXTURED_POINTS_ATTRIBUTES = [
  {
    id: "pointType",
    name: "Point Type",
    description: "Determines the type of point to display",
    configLocked: true,
    parameterType: SHADER_PROPERTY_TYPES.ATTRIBUTE,
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    attributeConfig: {
      attributeValueType: ATTRIBUTE_VALUE_TYPES.RANDOM_VALUE,
      assetId: "",
    },
  },
  {
    id: "pointDisplay",
    name: "Point Display",
    description: "Controls whether a point is displayed",
    configLocked: true,
    parameterType: SHADER_PROPERTY_TYPES.ATTRIBUTE,
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    attributeConfig: {
      attributeValueType: ATTRIBUTE_VALUE_TYPES.RANDOMIZED_BINARY,
      assetId: "",
    },
  },
];

const TEXTURED_POINT_MESH_TRANSFORM_CONFIG = {
  id: "texturedPointTransform",
  type: MESH_TRANSFORM_TYPE.CUSTOM_ATTRIBUTES,
  transformedMeshIds: [],
  materialId: "",
  transformParameterConfigs: [...TEXTURED_POINTS_ATTRIBUTES],
};

const TEXTURED_POINT_PARAMETERS = [
  {
    id: "pointTexture",
    valueType: SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D,
    value: null,
    configLocked: true,
    isAssetMapped: true,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
    assetMappingConfig: {
      relationship: ASSET_MAPPING_RELATIONSHIPS.TEXTURE,
    },
  },
] as ParameterConfig[];

export const pointMaterialTransformConfig = [
  {
    id: "setUpPointTexture",
    transformCode: [
      `vec4 textureColor = texture2D({{pointTexture}}, gl_PointCoord);`,
      `{{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}} = vec4({{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}}.rgb, 1.0) * textureColor;`,
      `return {{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}};`,
    ],
    returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    assignedVariableId: SHADER_VARIABLE_TYPES.FRAGMENT_COLOR,
  },
  {
    id: "discardPoints",
    transformCode: [
      `if({{pointDisplay}} == 0.0 ){`,
      `return 1.0;`,
      `}`,
      `if({{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}}.a < 0.5){`,
      `return 1.0;`,
      `}`,
      `return 0.0;`,
    ],
    returnValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    assignedVariableId: SHADER_VARIABLE_TYPES.DISCARD_COLOR,
  },
] as ShaderTransformationConfig[];

export const TEXTURED_POINT_EFFECT_CONFIG = {
  functions: [],
  meshTransformConfig: [TEXTURED_POINT_MESH_TRANSFORM_CONFIG],
  parameters: TEXTURED_POINT_PARAMETERS,
  transformationConfig: pointMaterialTransformConfig,
  outputValueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
};
