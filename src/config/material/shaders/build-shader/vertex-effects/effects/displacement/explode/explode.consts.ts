import {
  ShaderFunction,
  UniformConfig,
  VaryingConfig,
} from "../../../../../../../../types/materials/shaders/buildShader.types";

export const EXPLODE_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [
    { id: "uMinDistance", valueType: "FLOAT", value: 1.5 },
    { id: "uStrength", valueType: "FLOAT", value: 1.5 },
  ],
} as unknown as UniformConfig;

export const EXPLODE_FUNCTIONS = [] as ShaderFunction[];

export const EXPLODE_VARYINGS = [
  { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
] as VaryingConfig[];
