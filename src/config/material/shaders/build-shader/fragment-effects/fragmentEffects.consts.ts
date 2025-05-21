import { DEFAULT_COLOR_UNIFORMS } from "./effects/color/color.consts";

import {
  POINT_MATERIAL_PHONG_UNIFORMS,
  POINT_MATERIAL_UNIFORMS,
  POINT_MATERIAL_VARYINGS,
  TEXTURED_POINTS_ATTRIBUTES,
  TEXTURED_POINTS_UNIFORMS,
} from "./effects/points/pointMaterial.consts";
import { INTERACTIVE_EFFECTS } from "../constants/interactiveEffects.consts";
import { AFFECTED_POSITION_VARYINGS } from "./effects/interaction-based/interactionBased.consts";

export const FRAG_COLOR_NAME = "currentFragColor";

export const FRAGMENT_EFFECT = {
  NONE: "NONE",
  POINT_MATERIAL: "POINT_MATERIAL",
  TEXTURE_PIXEL_COLOR: "TEXTURE_PIXEL_COLOR",
  OVERLAY_COLOR: "OVERLAY_COLOR",
  POINT_MATERIAL_MATCAP: "POINT_MATERIAL_MATCAP",
  POINT_MATERIAL_TEXTURE: "POINT_MATERIAL_TEXTURE",
  POINT_MATERIAL_PHONG: "POINT_MATERIAL_PHONG",
  COLOR: "COLOR",
  MATCAP: "MATCAP",
  MATERIAL: "MATERIAL",
  PHONG: "PHONG",
  ...INTERACTIVE_EFFECTS,
};

export const DEFAULT_FRAG_COLOR = "#ff1205";

export const FRAGMENT_EFFECT_CONFIG_MAP = {
  [FRAGMENT_EFFECT.POINT_MATERIAL]: {
    uniforms: POINT_MATERIAL_UNIFORMS,
    attributes: [],
    varyings: POINT_MATERIAL_VARYINGS,
    functions: [],
  },
  [FRAGMENT_EFFECT.TEXTURE_PIXEL_COLOR]: {
    uniforms: POINT_MATERIAL_UNIFORMS,
    attributes: [],
    varyings: [],
  },
  [FRAGMENT_EFFECT.OVERLAY_COLOR]: {
    uniforms: POINT_MATERIAL_UNIFORMS,
    attributes: [],
    varyings: [],
  },
  [FRAGMENT_EFFECT.POINT_MATERIAL_MATCAP]: {
    uniforms: POINT_MATERIAL_UNIFORMS,
    attributes: [],
    varyings: [],
  },
  [FRAGMENT_EFFECT.POINT_MATERIAL_TEXTURE]: {
    uniforms: POINT_MATERIAL_UNIFORMS,
    attributes: [],
    varyings: [],
  },
  [FRAGMENT_EFFECT.POINT_MATERIAL_PHONG]: {
    uniforms: POINT_MATERIAL_PHONG_UNIFORMS,
    attributes: [],
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
