import { UniformConfig } from "../../../../../../..";
import { ShaderFunction } from "../../../../../../..";
import { VaryingConfig } from "../../../../../../..";

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
] as UniformConfig[];

const ROTATION_FUNCTIONS = [] as ShaderFunction[];

const ROTATION_VARYINGS = [
  { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
] as VaryingConfig[];

export const ROTATION_EFFECT_CONFIG = {
  uniforms: ROTATION_UNIFORMS,
  functions: ROTATION_FUNCTIONS,
  varyings: ROTATION_VARYINGS,
  attributes: [],
  meshTransformConfig: [],
  parameters: [],
};
