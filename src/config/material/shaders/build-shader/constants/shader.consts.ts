import { Vector3, Vector2 } from "three";

export const EMPTY_UNIFORM_CONFIG = {
  defaultUniforms: [],
  customUniforms: [],
};

export const SHADER_PROPERTY_VALUE_TYPES = {
  INT: "INT",
  FLOAT: "FLOAT",
  BOOL: "BOOL",
  VEC2: "VEC2",
  VEC3: "VEC3",
  VEC4: "VEC4",
  MAT2: "MAT2",
  MAT3: "MAT3",
  MAT4: "MAT4",
  SAMPLER2D: "SAMPLER2D",
  SAMPLER_CUBE: "SAMPLER_CUBE",
  VOID: "VOID",
  CONST: "CONST",
  STRUCT: "STRUCT",
};

export const SHADER_PROPERTY_TYPES = {
  UNIFORM: "UNIFORM",
  VARYING: "VARYING",
  ATTRIBUTE: "ATTRIBUTE",
};

export const DEFAULT_UNIFORMS = {
  uPosition: {
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    defaultValue: new Vector3(0, 0, 0),
  },
  uResolution: {
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
    defaultValue: new Vector2(0, 0),
  },
  uMaterial: {
    valueType: SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D,
    defaultValue: null,
  },
  uOpacity: {
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    defaultValue: 1.0,
  },
  uProgress: {
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    defaultValue: 0.0,
  },
  uBrightness: {
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    defaultValue: 1.0,
  },
  uStrength: {
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    defaultValue: 8.0,
  },
  uLoopCount: {
    valueType: SHADER_PROPERTY_VALUE_TYPES.INT,
    defaultValue: 0,
  },
  uCenter: {
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    defaultValue: new Vector3(0, 0, 0),
  },
  uIsTriggered: {
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    defaultValue: 0.0,
  },
  uTextureSize: {
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
    defaultValue: new Vector3(0, 0),
  },
};

export const UNIFORM_TO_ASSET_MAPPING_CONFIG = {
  id: "",
  assetId: "",
  relationship: "TEXTURE",
};

export const ASSET_MAPPING_RELATIONSHIPS = {
  TEXTURE: "TEXTURE",
  DIMENSION: "DIMENSION",
  CENTER3D: "CENTER3D",
  VIDEO: "VIDEO",
  VIDEO_STREAM: "VIDEO_STREAM",
};

export const ATTRIBUTE_VALUE_TYPES = {
  INDEXED: "INDEXED",
  RANDOM_VALUE: "RANDOM_VALUE",
  RANDOMIZED_BINARY: "RANDOMIZED_BINARY",
};
