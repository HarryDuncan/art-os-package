import { ParameterConfig } from "../../../../../../..";
import { ShaderFunction } from "../../../../../../..";

const ROTATION_UNIFORMS = [
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
] as ParameterConfig[];

const ROTATION_FUNCTIONS = [] as ShaderFunction[];

// const ROTATION_VARYINGS = [
//   { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
// ] as VaryingConfig[];
export const ROTATION_EFFECT_CONFIG = {
  functions: ROTATION_FUNCTIONS,
  meshTransformConfig: [],
  parameters: [],
  transformationConfig: [],
};
