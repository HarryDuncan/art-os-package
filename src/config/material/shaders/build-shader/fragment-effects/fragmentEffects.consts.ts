import { DEFAULT_FRAG_BRIGHTNESS_PROPS } from "./effects/brightness/brightness.consts";
import {
  DEFAULT_COLOR_UNIFORMS,
  DEFAULT_FRAG_COLOR_PROPS,
} from "./effects/color/color.consts";

import {
  DEFAULT_FRAG_POINT_PROPS,
  POINT_MATERIAL_PHONG_UNIFORMS,
  POINT_MATERIAL_UNIFORMS,
  TEXTURED_POINTS_ATTRIBUTES,
  TEXTURED_POINTS_UNIFORMS,
} from "./effects/material/point-material/pointMaterial.consts";
import { POINTS_ATTRIBUTES } from "../vertex-effects/effects/points/points.consts";
import { INTERACTIVE_EFFECTS } from "../constants/interactiveEffects.consts";
import { AFFECTED_POSITION_VARYINGS } from "./effects/interaction-based/interactionBased.consts";

export const FRAG_COLOR_NAME = "currentFragColor";

export const FRAGMENT_EFFECT = {
  NONE: "NONE",
  POINT_MATERIAL: "POINT_MATERIAL",
  POINT_MATERIAL_PIXEL_COLOR: "POINT_MATERIAL_PIXEL_COLOR",
  POINT_MATERIAL_OVERLAY_COLOR: "POINT_MATERIAL_OVERLAY_COLOR",
  POINT_MATERIAL_MATCAP: "POINT_MATERIAL_MATCAP",
  POINT_MATERIAL_TEXTURE: "POINT_MATERIAL_TEXTURE",
  POINT_MATERIAL_PHONG: "POINT_MATERIAL_PHONG",
  DEFAULT: "DEFAULT",
  EMPTY: "EMPTY",
  COLOR: "COLOR",
  MATCAP: "MATCAP",
  MATERIAL: "MATERIAL",
  OPACITY: "OPACITY",
  VANISH: "VANISH",
  BRIGHTNESS: "BRIGHTNESS",
  PHYSICAL_MATERIAL: "PHYSICAL_MATERIAL",
  PHONG: "PHONG",
  ...INTERACTIVE_EFFECTS,
};

export const DEFAULT_FRAG_COLOR = "#ff1205";

export const DEFAULT_FRAGMENT_EFFECT_PARAMS = {
  declareInTransform: true,
};

export const TRIGGERED_FRAGMENT_EFFECT = {
  COLOR: "COLOR",
  OPACITY: "OPACITY",
  EMPTY: "EMPTY",
};

export const IMAGE_FRAGMENT_EFFECT = {};

export const INTERACTION_FRAGMENT_EFFECT = {
  COLOR: "COLOR",
};

export const FRAGMENT_EFFECT_PROPS_MAP = {
  [FRAGMENT_EFFECT.DEFAULT]: {
    effectType: FRAGMENT_EFFECT.DEFAULT,
    effectProps: {},
  },
  [FRAGMENT_EFFECT.EMPTY]: {
    effectType: FRAGMENT_EFFECT.EMPTY,
    effectProps: {},
  },
  [FRAGMENT_EFFECT.COLOR]: {
    effectType: FRAGMENT_EFFECT.COLOR,
    effectProps: DEFAULT_FRAG_COLOR_PROPS,
  },
  [FRAGMENT_EFFECT.MATCAP]: {
    effectType: FRAGMENT_EFFECT.MATCAP,
    effectProps: {},
  },
  [FRAGMENT_EFFECT.MATERIAL]: {
    effectType: FRAGMENT_EFFECT.MATERIAL,
    effectProps: {},
  },
  [FRAGMENT_EFFECT.POINT_MATERIAL]: {
    effectType: FRAGMENT_EFFECT.POINT_MATERIAL,
    effectProps: DEFAULT_FRAG_POINT_PROPS,
  },
  [FRAGMENT_EFFECT.OPACITY]: {
    effectType: FRAGMENT_EFFECT.OPACITY,
    effectProps: {},
  },

  [FRAGMENT_EFFECT.VANISH]: {
    effectType: FRAGMENT_EFFECT.VANISH,
    effectProps: {},
  },
  [FRAGMENT_EFFECT.BRIGHTNESS]: {
    effectType: FRAGMENT_EFFECT.BRIGHTNESS,
    effectProps: DEFAULT_FRAG_BRIGHTNESS_PROPS,
  },
  [FRAGMENT_EFFECT.PHYSICAL_MATERIAL]: {
    effectType: FRAGMENT_EFFECT.PHYSICAL_MATERIAL,
    effectProps: {},
  },
  [FRAGMENT_EFFECT.PHONG]: {
    effectType: FRAGMENT_EFFECT.PHONG,
    effectProps: {},
  },
  [FRAGMENT_EFFECT.AFFECTED_POSITION]: {
    effectType: FRAGMENT_EFFECT.AFFECTED_POSITION,
    effectProps: {},
  },
};

// [FRAGMENT_EFFECT.INTERACTIVE]: {
//   effectType: FRAGMENT_EFFECT.INTERACTIVE,
//   effectProps: {},
// },

// [FRAGMENT_EFFECT.IMAGE_AS_MASK]: {
//   effectType: FRAGMENT_EFFECT.IMAGE_AS_MASK,
//   effectProps: DEFAULT_FRAG_IMAGE_AS_MASK_PROPS,
// },
// [FRAGMENT_EFFECT.HUE_SHIFT]: {
//   effectType: FRAGMENT_EFFECT.HUE_SHIFT,
//   effectProps: DEFAULT_FRAG_HUE_SHIFT_PROPS,
// },
export const FRAGMENT_EFFECT_CONFIG_MAP = {
  [FRAGMENT_EFFECT.POINT_MATERIAL]: {
    uniforms: POINT_MATERIAL_UNIFORMS,
    attributes: POINTS_ATTRIBUTES,
    varyings: [],
  },
  [FRAGMENT_EFFECT.POINT_MATERIAL_PIXEL_COLOR]: {
    uniforms: POINT_MATERIAL_UNIFORMS,
    attributes: POINTS_ATTRIBUTES,
    varyings: [],
  },
  [FRAGMENT_EFFECT.POINT_MATERIAL_OVERLAY_COLOR]: {
    uniforms: POINT_MATERIAL_UNIFORMS,
    attributes: POINTS_ATTRIBUTES,
    varyings: [],
  },
  [FRAGMENT_EFFECT.POINT_MATERIAL_MATCAP]: {
    uniforms: POINT_MATERIAL_UNIFORMS,
    attributes: POINTS_ATTRIBUTES,
    varyings: [],
  },
  [FRAGMENT_EFFECT.POINT_MATERIAL_TEXTURE]: {
    uniforms: POINT_MATERIAL_UNIFORMS,
    attributes: POINTS_ATTRIBUTES,
    varyings: [],
  },
  [FRAGMENT_EFFECT.POINT_MATERIAL_PHONG]: {
    uniforms: POINT_MATERIAL_PHONG_UNIFORMS,
    attributes: POINTS_ATTRIBUTES,
    varyings: [],
  },
  TEXTURED_POINTS: {
    uniforms: TEXTURED_POINTS_UNIFORMS,
    attributes: TEXTURED_POINTS_ATTRIBUTES,
    varyings: [],
  },
  [FRAGMENT_EFFECT.COLOR]: {
    uniforms: DEFAULT_COLOR_UNIFORMS,
    attributes: [],
    varyings: [],
  },
  [FRAGMENT_EFFECT.AFFECTED_POSITION]: {
    uniforms: [],
    attributes: [],
    varyings: AFFECTED_POSITION_VARYINGS,
  },
};
