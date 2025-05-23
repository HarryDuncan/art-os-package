import { IMAGE_TO_POINTS_EFFECT_CONFIG } from "./effects/image-vertex-effects/image-to-points/imageToPoints.consts";
import { AFFECTED_POSITION_EFFECT_CONFIG } from "./effects/interaction-based/interactionBased.consts";
import { INTERACTIVE_EFFECTS } from "../constants/interactiveEffects.consts";
import { EXPLODE_EFFECT_CONFIG } from "./effects/displacement/explode/explode.consts";
import { ROTATION_EFFECT_CONFIG } from "./effects/rotation-effects/rotationEffect.config";

export const VERTEX_POINT_NAME = "currentVertexPoint";
export const VERTEX_NORMAL_NAME = "currentVertexNormal";
export const VERTEX_POINT_INSTANTIATION = `vec4 ${VERTEX_POINT_NAME} = vec4(position.xyz, 1.0);`;
export const VERTEX_NORMAL_INSTANTIATION = `vec4 ${VERTEX_NORMAL_NAME} = vec4(normal.xyz, 1.0);`;

export const VERTEX_EFFECTS = {
  NONE: "NONE",
  EXPLODE: "EXPLODE",
  IMAGE_TO_POINTS: "IMAGE_TO_POINTS",
  ROTATION: "ROTATION",
  ...INTERACTIVE_EFFECTS,
};

export const enum TransformTypes {
  TRANSLATE = "TRANSLATE",
}

export const DEFAULT_VERTEX_EFFECT_PARAMS = {
  declareInTransform: true,
};

export const VERTEX_EFFECT_CONFIG_MAP = {
  [VERTEX_EFFECTS.IMAGE_TO_POINTS]: IMAGE_TO_POINTS_EFFECT_CONFIG,
  [VERTEX_EFFECTS.EXPLODE]: EXPLODE_EFFECT_CONFIG,
  [VERTEX_EFFECTS.AFFECTED_POSITION]: AFFECTED_POSITION_EFFECT_CONFIG,
  [VERTEX_EFFECTS.ROTATION]: ROTATION_EFFECT_CONFIG,
};
