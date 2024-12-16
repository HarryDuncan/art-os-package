export enum ShaderPropertyValueTypes {
  INT = "INT",
  FLOAT = "FLOAT",
  BOOL = "BOOL",
  VEC2 = "VEC2",
  VEC3 = "VEC3",
  VEC4 = "VEC4",
  MAT2 = "MAT2",
  MAT3 = "MAT3",
  MAT4 = "MAT4",
  SAMPLER2D = "SAMPLER2D",
  SAMPLER_CUBE = "SAMPLER_CUBE",
  VOID = "VOID",
  CONST = "CONST",
  STRUCT = "STRUCT",
}

export enum ShaderPropertyTypes {
  UNIFORM = "UNIFORM",
  VARYING = "VARYING",
  ATTRIBUTE = "ATTRIBUTE",
}

export const MAIN_START = "void main() {";
export const MAIN_END = "}";

export const POINT_PARENTS = {
  INTERACTIVE: "INTERACTIVE",
  TRIGGERED: "TRIGGERED",
  IMAGE_EFFECT: "IMAGE_EFFECT",
  TRANSITION: "TRANSITION",
};
