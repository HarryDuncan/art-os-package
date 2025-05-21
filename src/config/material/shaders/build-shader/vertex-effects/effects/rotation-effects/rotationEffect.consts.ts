import {
  ShaderFunction,
  UniformConfig,
  VaryingConfig,
} from "../../../buildShader.types";

export const ROTATION_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [
    {
      id: "uRotationSpeed",
      valueType: "FLOAT",
      value: 1.0,
      configLocked: true,
    },
    {
      id: "uRotationAxis",
      valueType: "VEC3",
      value: [0, 1, 0],
      configLocked: true,
    },
  ],
} as unknown as UniformConfig;

export const ROTATION_FUNCTIONS = [] as ShaderFunction[];

export const ROTATION_VARYINGS = [
  { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
] as VaryingConfig[];
