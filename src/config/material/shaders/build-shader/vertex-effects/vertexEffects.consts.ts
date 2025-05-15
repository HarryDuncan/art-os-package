import { QUAD_MESH_TRANSFORM } from "../../../../mesh/meshTransforms.consts";
import {
  EXPLODE_ATTRIBUTES,
  EXPLODE_UNIFORMS,
} from "./effects/displacement/explode/explode.consts";
import {
  IMAGE_TO_POINTS_ATTRIBUTES,
  IMAGE_TO_POINTS_UNIFORMS,
} from "./effects/image-vertex-effects/image-to-points/imageToPoints.consts";
import { DEFAULT_ROTATION_EFFECT_CONFIG } from "./effects/rotation/rotation.consts";
import {
  AFFECTED_POSITION_ATTRIBUTES,
  AFFECTED_POSITION_UNIFORMS,
} from "./effects/interaction-based/interactionBased.consts";
import { INTERACTIVE_EFFECTS } from "../constants/interactiveEffects.consts";
export const VERTEX_POINT_NAME = "currentVertexPoint";
export const VERTEX_NORMAL_NAME = "currentVertexNormal";
export const VERTEX_EFFECTS = {
  NONE: "NONE",
  EXPLODE: "EXPLODE",
  FILTER: "FILTER_VERTEX",
  POINTS: "POINTS",
  ROTATE: "ROTATE",
  MORPH: "MORPH",
  DISTORT: "DISTORT",
  ALIEN: "ALIEN",
  CLOUD: "CLOUD",
  TRAVERSE: "TRAVERSE",
  EXPAND: "EXPAND",
  NOISE: "NOISE",
  IMAGE_TO_POINTS: "IMAGE_TO_POINTS",
  IMAGE_AS_MASK: "IMAGE_AS_MASK",
  ...INTERACTIVE_EFFECTS,
};

export const enum TransformTypes {
  TRANSLATE = "TRANSLATE",
}

export const DEFAULT_VERTEX_EFFECT_PARAMS = {
  declareInTransform: true,
};

export const MORPH_TRANSITION_EFFECTS = {
  NOISE_TRANSITION: "NOISE_TRANSITION",
};

export const DISPLACEMENT_TYPES = {
  EXPLODE: "EXPLODE",
  IMPLODE: "IMPLODE",
};

export const DISTORTION_TYPES = {
  STRETCH: "STRETCH",
  TWIST: "TWIST",
  FLEXY_TWISTER: "FLEXY_TWISTER",
};

export const TRIGGERED_VERTEX_EFFECT = {
  DISPLACE: "DISPLACE",
  WARP: "WARP",
};

export const INTERACTION_VERTEX_EFFECT = {
  DISPLACE: "DISPLACE",
  WARP: "WARP",
};

export const VERTEX_EFFECT_PROPS_MAP = {
  [VERTEX_EFFECTS.NONE]: {
    effectType: VERTEX_EFFECTS.NONE,
    effectProps: {},
  },
  [VERTEX_EFFECTS.EXPLODE]: {
    effectType: VERTEX_EFFECTS.EXPLODE,
    effectProps: {},
  },
  [VERTEX_EFFECTS.FILTER]: {
    effectType: VERTEX_EFFECTS.FILTER,
    effectProps: {},
  },
  [VERTEX_EFFECTS.POINTS]: {
    effectType: VERTEX_EFFECTS.POINTS,
    effectProps: {},
  },
  [VERTEX_EFFECTS.ROTATE]: {
    effectType: VERTEX_EFFECTS.ROTATE,
    effectProps: DEFAULT_ROTATION_EFFECT_CONFIG,
  },
  [VERTEX_EFFECTS.MORPH]: {
    effectType: VERTEX_EFFECTS.MORPH,
    effectProps: {},
  },
  [VERTEX_EFFECTS.DISTORT]: {
    effectType: VERTEX_EFFECTS.DISTORT,
    effectProps: {},
  },
  [VERTEX_EFFECTS.ALIEN]: {
    effectType: VERTEX_EFFECTS.ALIEN,
    effectProps: {},
  },
  [VERTEX_EFFECTS.CLOUD]: {
    effectType: VERTEX_EFFECTS.CLOUD,
    effectProps: {},
  },

  [VERTEX_EFFECTS.TRAVERSE]: {
    effectType: VERTEX_EFFECTS.TRAVERSE,
    effectProps: {},
  },
  [VERTEX_EFFECTS.EXPAND]: {
    effectType: VERTEX_EFFECTS.EXPAND,
    effectProps: {},
  },
  [VERTEX_EFFECTS.NOISE]: {
    effectType: VERTEX_EFFECTS.NOISE,
    effectProps: {},
  },

  [VERTEX_EFFECTS.IMAGE_TO_POINTS]: {
    effectType: VERTEX_EFFECTS.IMAGE_TO_POINTS,
    effectProps: {},
  },
  [VERTEX_EFFECTS.IMAGE_AS_MASK]: {
    effectType: VERTEX_EFFECTS.IMAGE_AS_MASK,
    effectProps: {},
  },
  [VERTEX_EFFECTS.AFFECTED_POSITION]: {
    effectType: VERTEX_EFFECTS.AFFECTED_POSITION,
    effectProps: {},
  },
};

export const VERTEX_EFFECT_CONFIG_MAP = {
  [VERTEX_EFFECTS.IMAGE_TO_POINTS]: {
    uniforms: IMAGE_TO_POINTS_UNIFORMS,
    attributes: IMAGE_TO_POINTS_ATTRIBUTES,
    transforms: [QUAD_MESH_TRANSFORM],
  },
  [VERTEX_EFFECTS.EXPLODE]: {
    uniforms: EXPLODE_UNIFORMS,
    attributes: EXPLODE_ATTRIBUTES,
  },
  [VERTEX_EFFECTS.FILTER]: {
    uniforms: {},
    attributes: [],
  },
  [VERTEX_EFFECTS.AFFECTED_POSITION]: {
    uniforms: AFFECTED_POSITION_UNIFORMS,
    attributes: AFFECTED_POSITION_ATTRIBUTES,
  },
};
