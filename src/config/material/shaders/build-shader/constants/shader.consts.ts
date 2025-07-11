import { ParameterConfig } from "../buildShader.types";

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
  CONSTANT: "CONSTANT",
  UNIFORM: "UNIFORM",
  VARYING: "VARYING",
  ATTRIBUTE: "ATTRIBUTE",
};

export const ASSET_MAPPING_RELATIONSHIPS = {
  TEXTURE: "TEXTURE",
  DIMENSION: "DIMENSION",
  CENTER3D: "CENTER3D",
  VIDEO: "VIDEO",
  VIDEO_STREAM: "VIDEO_STREAM",
};

export const ATTRIBUTE_VALUE_TYPES = {
  SINGLE_VALUE: "SINGLE_VALUE",
  INDEXED: "INDEXED",
  RANDOM_VALUE: "RANDOM_VALUE",
  RANDOMIZED_BINARY: "RANDOMIZED_BINARY",
};

export const DEFAULT_UNIFORM_IDS = ["uTime"];
export const DEFAULT_UNIFORM_CONFIGS = [
  {
    id: "uTime",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
    isAssetMapped: false,
    assetMappingConfig: null,
    value: 0,
  },
] as unknown as ParameterConfig[];
