// import { HALFTONE } from "./color/halftone";
// import { AMBIENT_LIGHT } from "./lights/ambientLight";
// import { DIRECTIONAL_LIGHT } from "./lights/directionalLight";
// import { POINT_LIGHT } from "./lights/pointLight";

export const FRAGMENT_EFFECTS = {
  NONE: "NONE",
  TEXTURE_PIXEL_COLOR: "TEXTURE_PIXEL_COLOR",
  POINT_LIGHT: "POINT_LIGHT",
  DIRECTIONAL_LIGHT: "DIRECTIONAL_LIGHT",
  AMBIENT_LIGHT: "AMBIENT_LIGHT",
  HALFTONE: "HALFTONE",
};

const DEFAULT_FRAGMENT_EFFECT = {
  functions: [],
  meshTransformIds: [],
  parameters: [],
  transformSchema: [],
  assignedVariableId: "fragColor",
};
export const FRAGMENT_SCHEMA_MAP = {
  // [FRAGMENT_EFFECTS.POINT_LIGHT]: POINT_LIGHT,
  // [FRAGMENT_EFFECTS.DIRECTIONAL_LIGHT]: DIRECTIONAL_LIGHT,
  // [FRAGMENT_EFFECTS.AMBIENT_LIGHT]: AMBIENT_LIGHT,
  // [FRAGMENT_EFFECTS.HALFTONE]: HALFTONE,
  DEFAULT: DEFAULT_FRAGMENT_EFFECT,
};
