export const CONTROLLER_TYPE = {
  COLOR: "color",
  SLIDER: "slider",
  ASSET_CONTROLLER: "assetController",
  POSITION: "position",
} as const;

export const FRAGMENT_PARAMETER_GROUPS = {
  LIGHTS: "LIGHTS",
} as const;

export const VERTEX_PARAMETER_GROUPS = {} as const;

/** Slot keys on ShaderEffectLightConfig for fragment light groups. */
export const FRAGMENT_LIGHT_SLOT = {
  POSITION: "position",
  STRENGTH: "strength",
  COLOR: "color",
} as const;

/** Named group layouts that can be populated onto a light. */
export const FRAGMENT_LIGHT_GROUP_TYPE = {
  STANDARD: "STANDARD",
} as const;
