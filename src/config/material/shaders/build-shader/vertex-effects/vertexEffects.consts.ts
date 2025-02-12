export const VERTEX_POINT_NAME = "currentVertexPoint";
export const VERTEX_NORMAL_NAME = "currentVertexNormal";
export const VERTEX_EFFECTS = {
  EXPLODE: "EXPLODE",
  FILTER: "FILTER_VERTEX",
  POINTS: "POINTS",
  ROTATE: "ROTATE",
  MORPH: "MORPH",
  DISTORT: "DISTORT",
  ALIEN: "ALIEN",
  CLOUD: "CLOUD",
  INTERACTIVE: "INTERACTIVE",
  TRAVERSE: "TRAVERSE",
  EXPAND: "EXPAND",
  NOISE: "NOISE",
  TRIGGERED_EFFECT: "TRIGGERED",
  VERTEX_IMAGE_EFFECT: "VERTEX_IMAGE_EFFECT",
  IMAGE_TO_POINT: "IMAGE_TO_POINT",
};

export const enum TransformTypes {
  TRANSLATE = "TRANSLATE",
}

export const DEFAULT_VERTEX_EFFECT_PARAMS = {
  declareInTransform: true,
};

export const IMAGE_VERTEX_EFFECT = {
  IMAGE_TO_POINTS: "IMAGE_TO_POINT",
  IMAGE_AS_MASK: "IMAGE_AS_MASK",
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
