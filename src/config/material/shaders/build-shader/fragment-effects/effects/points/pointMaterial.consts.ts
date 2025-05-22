import { ParameterConfig, VaryingConfig } from "../../../buildShader.types";
import {
  ASSET_MAPPING_RELATIONSHIPS,
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../constants/shader.consts";
import { VARYING_TYPES } from "../../../shader-properties/varyings/varyings.consts";

export const DEFAULT_FRAG_POINT_PROPS = {
  isTextured: false,
  defaultPointColor: "#ff1205",
};

export const POINT_MATERIAL_VARYINGS = [
  {
    id: "vPointDisplay",
    varyingType: VARYING_TYPES.ATTRIBUTE,
    attributeKey: "pointDisplay",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  {
    id: "vPointType",
    varyingType: VARYING_TYPES.ATTRIBUTE,
    attributeKey: "pointType",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
] as VaryingConfig[];

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
