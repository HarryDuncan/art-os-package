import { POINT_MATERIAL_EFFECT_CONFIG } from "./effects/pointMaterial.config";
import { INTERACTIVE_EFFECTS } from "../constants/interactiveEffects.consts";
import { TEXTURE_PIXEL_COLOR_EFFECT_CONFIG } from "./effects/texturePixelColor.config";
import { DEFAULT_COLOR_EFFECT_CONFIG } from "./effects/defaultColor.config";
import { AFFECTED_POSITION_EFFECT_FRAGMENT_CONFIG } from "./effects/affectedPosition.config";
import { POINT_LIGHT_EFFECT_CONFIG } from "./effects/lights/pointLight.config";
import { AMBIENT_LIGHT_EFFECT_CONFIG } from "./effects/lights/ambientLight.config";
import { DIRECTIONAL_LIGHT_EFFECT_CONFIG } from "./effects/lights/directionalLight.config";

export const FRAG_COLOR_NAME = "currentFragColor";
export const FRAG_COLOR_INSTANTIATION = `vec4 ${FRAG_COLOR_NAME} = vec4(1.0,0,0,1.0); vec3 light = vec3(0.0);`;

export const FRAGMENT_EFFECTS = {
  NONE: "NONE",
  POINT_MATERIAL: "POINT_MATERIAL",
  TEXTURE_PIXEL_COLOR: "TEXTURE_PIXEL_COLOR",
  COLOR: "COLOR",
  POINT_LIGHT: "POINT_LIGHT",
  DIRECTIONAL_LIGHT: "DIRECTIONAL_LIGHT",
  AMBIENT_LIGHT: "AMBIENT_LIGHT",
  // OVERLAY_COLOR: "OVERLAY_COLOR",
  // POINT_MATERIAL_MATCAP: "POINT_MATERIAL_MATCAP",
  // POINT_MATERIAL_TEXTURE: "POINT_MATERIAL_TEXTURE",
  // POINT_MATERIAL_PHONG: "POINT_MATERIAL_PHONG",

  // MATCAP: "MATCAP",
  // MATERIAL: "MATERIAL",
  // PHONG: "PHONG",
  ...INTERACTIVE_EFFECTS,
};

export const DEFAULT_FRAG_COLOR = "#ff1205";

export const FRAGMENT_EFFECT_CONFIG_MAP = {
  [FRAGMENT_EFFECTS.POINT_MATERIAL]: POINT_MATERIAL_EFFECT_CONFIG,
  [FRAGMENT_EFFECTS.TEXTURE_PIXEL_COLOR]: TEXTURE_PIXEL_COLOR_EFFECT_CONFIG,
  [FRAGMENT_EFFECTS.COLOR]: DEFAULT_COLOR_EFFECT_CONFIG,
  [FRAGMENT_EFFECTS.AFFECTED_POSITION]:
    AFFECTED_POSITION_EFFECT_FRAGMENT_CONFIG,
  [FRAGMENT_EFFECTS.POINT_LIGHT]: POINT_LIGHT_EFFECT_CONFIG,
  [FRAGMENT_EFFECTS.DIRECTIONAL_LIGHT]: DIRECTIONAL_LIGHT_EFFECT_CONFIG,
  [FRAGMENT_EFFECTS.AMBIENT_LIGHT]: AMBIENT_LIGHT_EFFECT_CONFIG,
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
