import {
  ASSET_MAPPING_RELATIONSHIPS,
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_TAGS,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_VARIABLE_TYPES,
  VARYING_TYPES,
} from "../consts";

export const VERTEX_POINT = {
  key: "pointPosition",
  name: "Current Vertex Point",
  description:
    "The current vertex point - can be mapped to the current position or te original position of the mesh",

  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  parameterType: SHADER_PROPERTY_TYPES.SHADER_VARIABLE,
  shaderVariableConfig: {
    shaderVariableType: SHADER_VARIABLE_TYPES.VERTEX_POINT,
  },
  isDefault: true,
};

export const TIME = {
  key: "uTime",
  name: "Time",
  description: "The time of the animation",
  valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  value: null,
  isAssetMapped: false,
  parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  isDefault: true,
};

export const RESOLUTION = {
  id: "uResolution",
  name: "Resolution",
  description: "The resolution of the screen",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
  value: null,
  isAssetMapped: false,
  parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  isDefault: true,
};

export const UV = {
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
  isDefault: true,
};

export const NORMAL_VARYING = {
  id: "vNormal",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  value: null,
  isAssetMapped: false,
  parameterType: SHADER_PROPERTY_TYPES.VARYING,
  varyingConfig: {
    varyingType: VARYING_TYPES.DEFAULT,
  },
  isDefault: true,
};

export const POSITION_VARYING = {
  id: "vPosition",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  value: null,
  isAssetMapped: false,
  parameterType: SHADER_PROPERTY_TYPES.VARYING,
  varyingConfig: {
    varyingType: VARYING_TYPES.DEFAULT,
  },
  isDefault: true,
};

export const VIEW_DIRECTION_VARYING = {
  id: "vViewDirection",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  value: null,
  isAssetMapped: false,
  parameterType: SHADER_PROPERTY_TYPES.VARYING,
  varyingConfig: {
    varyingType: VARYING_TYPES.DEFAULT,
  },
  isDefault: true,
};
export const COLOR = {
  key: "color",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  value: [0, 0, 0, 1],
  isAssetMapped: false,
  parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  tags: [SHADER_PROPERTY_TAGS.COLOR],
  isDefault: true,
};
export const FRAGMENT_COLOR = {
  key: "fragColor",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  value: null,
  isAssetMapped: false,
  isDefault: true,
  parameterType: SHADER_PROPERTY_TYPES.SHADER_VARIABLE,
  shaderVariableConfig: {
    shaderVariableType: SHADER_VARIABLE_TYPES.FRAGMENT_COLOR,
  },
};

export const QUAD_DIMENSION = {
  key: "quadDimensions",
  name: "Quad Dimensions",
  description: "The dimensions of the quad mesh",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
  isAssetMapped: true,
  parameterType: SHADER_PROPERTY_TYPES.MESH_TRANSFORM_VALUE,
  assetMappingConfig: {
    relationship: ASSET_MAPPING_RELATIONSHIPS.DIMENSION,
  },
  isDefault: true,
};

export const POINT_OFFSET = {
  key: "pointOffset",
  name: "Point Offset",
  description: "The offset of each point in the mesh",
  parameterType: SHADER_PROPERTY_TYPES.ATTRIBUTE,
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  attributeConfig: {
    attributeValueType: ATTRIBUTE_VALUE_TYPES.INDEXED,
    assetId: "",
  },
  isDefault: true,
};

export const ORIGINAL_POSITION = {
  key: "position",
  name: "Original Position",
  description: "The original position of the point",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  parameterType: SHADER_PROPERTY_TYPES.ATTRIBUTE,
  attributeConfig: {
    attributeValueType: ATTRIBUTE_VALUE_TYPES.INDEXED,
    assetId: "",
  },
  isDefault: true,
};
