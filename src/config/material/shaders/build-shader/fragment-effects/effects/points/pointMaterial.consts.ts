import {
  ParameterConfig,
  ShaderTransformationConfig,
} from "../../../buildShader.types";
import { SHADER_VARIABLE_TYPES } from "../../../constants";
import {
  ASSET_MAPPING_RELATIONSHIPS,
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../constants/shader.consts";

export const POINT_MATERIAL_FUNCTIONS = [];

export const POINT_MATERIAL_ATTRIBUTES = [];

export const POINT_MATERIAL_UNIFORMS = [];

export const TEXTURED_POINTS_ATTRIBUTES = [
  {
    id: "pointType",
    name: "Point Type",
    description: "Determines the type of point to display",
    configLocked: true,
    isAttribute: true,
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
    isAttribute: true,
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    attributeConfig: {
      attributeValueType: ATTRIBUTE_VALUE_TYPES.RANDOMIZED_BINARY,
      assetId: "",
    },
  },
];

export const POINT_MATERIAL_PARAMETERS = [
  {
    id: "uPointTexture1",
    valueType: SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D,
    value: null,
    configLocked: true,
    isAssetMapped: true,
    isUniform: true,
    assetMappingConfig: {
      relationship: ASSET_MAPPING_RELATIONSHIPS.TEXTURE,
    },
  },
  {
    id: "uPointTexture2",
    valueType: SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D,
    value: null,
    configLocked: true,
    isAssetMapped: true,
    isUniform: true,
    assetMappingConfig: {
      relationship: ASSET_MAPPING_RELATIONSHIPS.TEXTURE,
    },
  },
  ...TEXTURED_POINTS_ATTRIBUTES,
] as ParameterConfig[];

export const pointMaterialTransformConfig = [
  {
    id: "pointMaterial",
    functionContent: [
      `if(vPointType > 0.0 && vPointType < 0.5){`,
      `vec4 textureColor =  texture2D(uPointTexture1, gl_PointCoord);`,
      `currentFragColor = vec4(currentFragColor.rgb, 1.0) * textureColor;`,
      `}`,
      `if(vPointType > 0.5 && vPointType < 1.1){`,
      `vec4 textureColor =  texture2D(uPointTexture2, gl_PointCoord);`,
      `currentFragColor = vec4(currentFragColor.rgb, 1.0) * textureColor;`,
      `}`,
    ],
    returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    shaderVariableType: SHADER_VARIABLE_TYPES.FRAGMENT_COLOR,
  },
  {
    id: "discardPoints",
    functionContent: [`if(vPointDisplay == 0.0 ){`, ` discard;`, `}`],
    returnValue: SHADER_PROPERTY_VALUE_TYPES.BOOL,
  },
] as ShaderTransformationConfig[];
