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
export const VERTEX_EFFECT_POINT_NAMES = {
  DEFAULT_POINT: "position",
  DISTORT_POINT: "distortPoint",
  ALIEN_DISTORT: "alienPoint",
  EXPLODED_POINT: "explodedPoint",
  FILTERED_POINT: "filteredPoint",
  ROTATED_POINT: "rotatedPoint",
  CLOUD_POINT: "cloudPoint",
  MORPHED_POINT: "morphedPoint",
  EXPANDED_POINT: "expandedPoint",
  INTERACTED_POINT: "interactedPoint",
  TRAVERSE_POINT: "traversePoint",
  NOISE_POINT: "noisePoint",
  TRIGGERED_POINT: "triggeredPoint",
  IMAGE_VERTEX_POINT: "imageVertexPoint",
  IMAGE_TO_POINT: "imageToPoint",
  TRANSITION_POINT: "transitionPoint",
};

export const enum TransformTypes {
  TRANSLATE = "TRANSLATE",
}

export const DEFAULT_VERTEX_EFFECT_PARAMS = {
  declareInTransform: true,
};

export const IMAGE_VERTEX_EFFECT = {
  IMAGE_TO_POINTS: "IMAGE_TO_POINTS",
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
