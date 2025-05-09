import { uniform } from "three/tsl";
import { DEFAULT_FRAG_BRIGHTNESS_PROPS } from "../../config/material/shaders/build-shader/fragment-effects/effects/brightness/brightness.consts";
import { DEFAULT_FRAG_COLOR_PROPS } from "../../config/material/shaders/build-shader/fragment-effects/effects/color/color.consts";
import { DEFAULT_FRAG_HUE_SHIFT_PROPS } from "../../config/material/shaders/build-shader/fragment-effects/effects/hue-shift/hueShift.consts";
import { DEFAULT_FRAG_IMAGE_AS_MASK_PROPS } from "../../config/material/shaders/build-shader/fragment-effects/effects/image-as-mask/imageAsMask.consts";
import {
  DEFAULT_FRAG_POINT_PROPS,
  POINT_COLOR_EFFECTS,
} from "../../config/material/shaders/build-shader/fragment-effects/effects/material/point-material/pointMaterial.consts";
import { getTexturePixelColor } from "../../config/material/shaders/build-shader/fragment-effects/effects/material/point-material/point-material-functions/getTexturePixelColor";
import { getOverlayPixelColor } from "../../config/material/shaders/build-shader/fragment-effects/effects/material/point-material/point-material-functions/getOverlayPixelColor";

export const FRAG_COLOR_NAME = "currentFragColor";

export const FRAGMENT_EFFECT = {
  NONE: "NONE",
  DEFAULT: "DEFAULT",
  EMPTY: "EMPTY",
  COLOR: "COLOR",
  MATCAP: "MATCAP",
  MATERIAL: "MATERIAL",
  POINT_MATERIAL: "POINT_MATERIAL",
  POINT_MATERIAL_PIXEL_COLOR: "POINT_MATERIAL_PIXEL_COLOR",
  POINT_MATERIAL_OVERLAY_COLOR: "POINT_MATERIAL_OVERLAY_COLOR",
  POINT_MATERIAL_MATCAP: "POINT_MATERIAL_MATCAP",
  POINT_MATERIAL_TEXTURE: "POINT_MATERIAL_TEXTURE",
  POINT_MATERIAL_PHONG: "POINT_MATERIAL_PHONG",
  OPACITY: "OPACITY",
  INTERACTIVE: "INTERACTIVE",
  TRIGGERED: "TRIGGERED",
  VANISH: "VANISH",
  BRIGHTNESS: "BRIGHTNESS",
  PHYSICAL_MATERIAL: "PHYSICAL_MATERIAL",
  PHONG: "PHONG",
  IMAGE_AS_MASK: "IMAGE_AS_MASK",
  HUE_SHIFT: "HUE_SHIFT",
};

export const FRAGMENT_COLOR_NAMES = {
  DEFAULT: "fragColor",
  MATERIAL: "fragMaterialColor",
  POINT_MATERIAL: "fragPointMaterial",
  COLOR: "fragColouredColor",
  OPACITY: "fragOpacity",
  INTERACTIVE: "fragInteractive",
  TRIGGERED: "fragTriggered",
  VANISH: "fragVanish",
  BRIGHTNESS: "fragBrightness",
  PHYSICAL_MATERIAL: "fragPhysicalMaterial",
  MASK_MATERIAL: "maskMaterial",
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
  [FRAGMENT_EFFECT.INTERACTIVE]: {
    effectType: FRAGMENT_EFFECT.INTERACTIVE,
    effectProps: {},
  },
  [FRAGMENT_EFFECT.TRIGGERED]: {
    effectType: FRAGMENT_EFFECT.TRIGGERED,
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
  [FRAGMENT_EFFECT.IMAGE_AS_MASK]: {
    effectType: FRAGMENT_EFFECT.IMAGE_AS_MASK,
    effectProps: DEFAULT_FRAG_IMAGE_AS_MASK_PROPS,
  },
  [FRAGMENT_EFFECT.HUE_SHIFT]: {
    effectType: FRAGMENT_EFFECT.HUE_SHIFT,
    effectProps: DEFAULT_FRAG_HUE_SHIFT_PROPS,
  },
};

export const FRAGMENT_EFFECT_DATA = {
  [FRAGMENT_EFFECT.POINT_MATERIAL]: {
    POINT_COLOR_EFFECTS: POINT_COLOR_EFFECTS,
  },
};

// export const FRAGMENT_EFFECT_CONFIG_MAP = {
//   [FRAGMENT_EFFECT.POINT_MATERIAL] : {
//     uniforms :
//   }
// }
