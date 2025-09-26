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
    "The current vertex point - can be mapped to the current position or the original position of the mesh",

  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  parameterType: SHADER_PROPERTY_TYPES.SHADER_VARIABLE,
  shaderVariableConfig: {
    shaderVariableType: SHADER_VARIABLE_TYPES.VERTEX_POINT,
  },
  isDefault: true,
};

export const NORMAL = {
  key: "normal",
  name: "Current Vertex Normal",
  description:
    "The normal of the vertex - can be mapped to the normal of the mesh",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  parameterType: SHADER_PROPERTY_TYPES.SHADER_VARIABLE,
  shaderVariableConfig: {
    shaderVariableType: SHADER_VARIABLE_TYPES.NORMAL,
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
  key: "uResolution",
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

export const RENDER_TARGET = {
  key: "uRenderTarget",
  name: "Render Target",
  description: "The render target of the shader",
  valueType: SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D,
  value: null,
  isAssetMapped: false,
  parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  isDefault: true,
};
export const NORMAL_VARYING = {
  key: "vNormal",
  name: "Normal Varying",
  description: "will pass the calculated normal to the fragment shader",
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
  key: "vPosition",
  name: "Position Varying",
  description: "will pass the calculated position to the fragment shader",
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
  key: "vViewDirection",
  name: "View Direction Varying",
  description: "will pass the calculated view direction to the fragment shader",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  value: null,
  isAssetMapped: false,
  parameterType: SHADER_PROPERTY_TYPES.VARYING,
  varyingConfig: {
    varyingType: VARYING_TYPES.DEFAULT,
  },
  isDefault: true,
};

export const CAMERA_VARYING = {
  key: "vCamera",
  name: "Camera Varying",
  description: "will pass the calculated camera to the fragment shader",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  value: null,
  isAssetMapped: false,
  parameterType: SHADER_PROPERTY_TYPES.VARYING,
  varyingConfig: {
    varyingType: VARYING_TYPES.DEFAULT,
  },
  isDefault: true,
};

export const FRAGMENT_COLOR = {
  key: "fragColor",
  name: "Fragment Color",
  description: "The color of the fragment",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  value: null,
  isAssetMapped: false,
  isDefault: true,
  parameterType: SHADER_PROPERTY_TYPES.SHADER_VARIABLE,
  shaderVariableConfig: {
    shaderVariableType: SHADER_VARIABLE_TYPES.FRAGMENT_COLOR,
  },
};

export const UV_VARYING = {
  key: "vUv",
  name: "UV Varying",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
  description: "will pass the calculated uv to the fragment shader",
  parameterType: SHADER_PROPERTY_TYPES.VARYING,
  varyingConfig: {
    varyingType: VARYING_TYPES.DEFAULT,
    attributeKey: "uv",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
  },
  isDefault: true,
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

export const DEFAULT_PARAMETERS = [
  VERTEX_POINT,
  NORMAL,
  QUAD_DIMENSION,
  POINT_OFFSET,
  ORIGINAL_POSITION,
  UV_VARYING,
  RESOLUTION,
  RENDER_TARGET,
  NORMAL_VARYING,
  CAMERA_VARYING,
  POSITION_VARYING,
];
