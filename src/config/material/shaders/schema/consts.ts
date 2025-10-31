export const SHADER_SCHEMA_TYPES = {
  OPERATOR: "operator",
  VERTEX: "vertex",
  FRAGMENT: "fragment",
  FUNCTION: "function",
  MESH_TRANSFORM: "mesh_transform",
};

export const SHADER_PROPERTY_VALUE_TYPES = {
  INT: "int",
  FLOAT: "float",
  BOOL: "bool",
  VEC2: "vec2",
  VEC3: "vec3",
  VEC4: "vec4",
  MAT2: "mat2",
  MAT3: "mat3",
  MAT4: "mat4",
  SAMPLER2D: "sampler2D",
  SAMPLER_CUBE: "samplerCube",
  VOID: "void",
  CONST: "const",
  STRUCT: "struct",
};

export const SHADER_PROPERTY_TYPES = {
  CONSTANT: "constant",
  UNIFORM: "uniform",
  VARYING: "varying",
  ATTRIBUTE: "attribute",
  MESH_TRANSFORM_VALUE: "mesh_transform_value",
  SHADER_VARIABLE: "shader_variable",
};

export const ASSET_MAPPING_RELATIONSHIPS = {
  TEXTURE: "texture",
  DIMENSION: "dimension",
  CENTER3D: "center3d",
  VIDEO: "video",
  VIDEO_STREAM: "video_stream",
  NORMAL: "normal",
  VERTEX_POINT: "vertex_point",
};

export const ATTRIBUTE_VALUE_TYPES = {
  SINGLE_VALUE: "single_value",
  INDEXED: "indexed",
  RANDOM_VALUE: "random_value",
  RANDOMIZED_BINARY: "randomized_binary",
  QUAD: "quad",
};

export const VARYING_TYPES = {
  DEFAULT: "default",
  ATTRIBUTE: "attribute",
  CUSTOM: "custom",
  BINARY: "binary",
  PARAMETER_FUNCTION: "parameter_function",
};

export const SHADER_VARIABLE_TYPES = {
  VERTEX_POINT: "vertex_point",
  FRAGMENT_COLOR: "fragment_color",
  DISCARD_COLOR: "discard_color",
  GL_POINT_SIZE: "point_size",
  POSITION: "position",
  NORMAL: "normal",
  LIGHT: "light",
  POST_EFFECT: "post_effect",
  SUB_FUNCTION: "sub_function",
  FUNCTION: "function",
};

export const SHADER_PROPERTY_TAGS = {
  COLOR: "color",
  QUAD: "quad",
};

export const SHADER_TYPES = {
  VERTEX: SHADER_SCHEMA_TYPES.VERTEX,
  FRAGMENT: SHADER_SCHEMA_TYPES.FRAGMENT,
};

export const SHADER_VARIABLE_ASSIGNMENT_KEYS = {
  VERTEX_POINT: "pointPosition",
  FRAGMENT_COLOR: "fragColor",
  LIGHT: "light",
  NORMAL: "normal",
  POST_EFFECT: "postEffect",
};

export const SHADER_VARIABLE_ASSIGNMENT_MAPS = {
  [SHADER_TYPES.VERTEX]: {
    [SHADER_VARIABLE_TYPES.VERTEX_POINT]: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    [SHADER_VARIABLE_TYPES.POSITION]: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    [SHADER_VARIABLE_TYPES.NORMAL]: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    [SHADER_VARIABLE_TYPES.GL_POINT_SIZE]: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  [SHADER_TYPES.FRAGMENT]: {
    [SHADER_VARIABLE_TYPES.FRAGMENT_COLOR]: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    [SHADER_VARIABLE_TYPES.DISCARD_COLOR]: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    [SHADER_VARIABLE_TYPES.LIGHT]: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    [SHADER_VARIABLE_TYPES.POST_EFFECT]: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  },
  [SHADER_SCHEMA_TYPES.FUNCTION]: {
    [SHADER_VARIABLE_TYPES.FUNCTION]: null,
    [SHADER_VARIABLE_TYPES.SUB_FUNCTION]: null,
  },
};
