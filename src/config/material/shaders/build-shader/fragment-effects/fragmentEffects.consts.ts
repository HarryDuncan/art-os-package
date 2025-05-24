import { POINT_MATERIAL_EFFECT_CONFIG } from "./effects/pointMaterial.config";
import { INTERACTIVE_EFFECTS } from "../constants/interactiveEffects.consts";

export const FRAG_COLOR_NAME = "currentFragColor";
export const FRAG_COLOR_INSTANTIATION = `vec4 ${FRAG_COLOR_NAME} = vec4(1.0,0,0,1.0);`;

export const FRAGMENT_EFFECTS = {
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
  [FRAGMENT_EFFECTS.POINT_MATERIAL]: POINT_MATERIAL_EFFECT_CONFIG,
};

// [FRAGMENT_EFFECTS.OVERLAY_COLOR]: {
//   uniforms: POINT_MATERIAL_UNIFORMS,
//   attributes: [],
//   varyings: [],
// },
// [FRAGMENT_EFFECTS.POINT_MATERIAL_MATCAP]: {
//   uniforms: POINT_MATERIAL_UNIFORMS,
//   attributes: [],
//   varyings: [],
// },
// [FRAGMENT_EFFECTS.POINT_MATERIAL_TEXTURE]: {
//   uniforms: POINT_MATERIAL_UNIFORMS,
//   attributes: [],
//   varyings: [],
// },
// [FRAGMENT_EFFECTS.POINT_MATERIAL_PHONG]: {
//   varyings: [],
// },

// [FRAGMENT_EFFECTS.COLOR]: {
//   uniforms: DEFAULT_COLOR_UNIFORMS,
//   attributes: [],
//   varyings: [],
// },
// [FRAGMENT_EFFECTS.AFFECTED_POSITION]: {
//   uniforms: [],
//   attributes: [],
//   varyings: AFFECTED_POSITION_VARYINGS,
// },
