import { AXIS } from "../../../../../../../types/position.types";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../../../../../consts/materials/shader.consts";

export const ROTATION_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [
    {
      id: "uRotationSpeed",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    },
  ],
};
export const ROTATION_FUNCTIONS = [];
export const ROTATION_VARYINGS = [];
export const ROTATION_ATTRIBUTES = [];

export const DEFAULT_ROTATION_EFFECT_CONFIG = {
  axis: AXIS.Y,
  speed: 0.2,
};

export const ROTATION_EFFECT_TYPES = {
  ROTATION_BY_TIME: "ROTATION_BY_TIME",
  ROTATION_BY_DEGREES: "ROTATION_BY_DEGREES",
};
