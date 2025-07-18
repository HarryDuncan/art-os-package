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
  parameterType: SHADER_PROPERTY_TYPES.SHADER_VARIABLE,
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  shaderVariableConfig: {
    shaderVariableType: SHADER_VARIABLE_TYPES.VERTEX_POINT,
  },
};

export const TIME = {
  key: "uTime",
  name: "Time",
  description: "The time of the animation",
  valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  value: null,
  isAssetMapped: false,
  parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
};

export const RESOLUTION = {
  id: "uResolution",
  name: "Resolution",
  description: "The resolution of the screen",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
  value: null,
  isAssetMapped: false,
  parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
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
};
export const COLOR = {
  key: "color",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  value: [0, 0, 0, 1],
  isAssetMapped: false,
  parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  tags: [SHADER_PROPERTY_TAGS.COLOR],
};
export const FRAGMENT_COLOR = {
  key: "fragColor",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  value: null,
  isAssetMapped: false,
  parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
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
};
