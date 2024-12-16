import { ShaderFunction, VaryingConfig } from "../../../../types";

export const EXPLODE_UNIFORMS = {
  defaultUniforms: ["uPosition"],
  customUniforms: [{ id: "uPower", valueType: "FLOAT", value: 1.5 }],
};

export const EXPLODE_FUNCTIONS = [] as ShaderFunction[];

export const EXPLODE_VARYINGS = [
  { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
] as VaryingConfig[];

export const DEFAULT_EXPLODE_PARAMETERS = {
  effectDistanceMinLength: 0.9,
  effectStrength: 0.5,
};
