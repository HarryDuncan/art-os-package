import { Vector2 } from "three";

export const V_DECLARATION = "// VARYING DECLARATION";
export const V_DEFAULT_INSTANTIATION = "// DEFAULT VARYING INSTANTIATION";
export const V_ATTRIBUTE_INSTANTIATION = "// ATTRIBUTE AS VARYING";
export const V_CUSTOM_INSTANTIATION = "// CUSTOM VARYING";

export const VARYING_TYPES = {
  DEFAULT: "DEFAULT",
  ATTRIBUTE: "ATTRIBUTE",
  CUSTOM: "CUSTOM",
  BINARY: "BINARY",
  FUNCTION: "FUNCTION",
};

export const DEFAULT_VARYINGS = {
  vUv: {
    valueType: "vec2",
    defaultValue: new Vector2(1, 1),
  },
};
