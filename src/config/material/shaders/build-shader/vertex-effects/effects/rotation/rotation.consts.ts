import { AXIS } from "../../../../../../../types/position.types";
import { ShaderPropertyValueTypes } from "../../../constants/buildShader.consts";

export const ROTATION_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [
    {
      id: "uRotationSpeed",
      valueType: ShaderPropertyValueTypes.FLOAT,
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
