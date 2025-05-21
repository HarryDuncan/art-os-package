import { QUAD_MESH_TRANSFORM } from "../../../../mesh/meshTransforms.consts";
import {
  EXPLODE_ATTRIBUTES,
  EXPLODE_UNIFORMS,
} from "./effects/displacement/explode/explode.consts";
import {
  IMAGE_TO_POINTS_ATTRIBUTES,
  IMAGE_TO_POINTS_UNIFORMS,
} from "./effects/image-vertex-effects/image-to-points/imageToPoints.consts";
import {
  AFFECTED_POSITION_ATTRIBUTES,
  AFFECTED_POSITION_UNIFORMS,
} from "./effects/interaction-based/interactionBased.consts";
import { INTERACTIVE_EFFECTS } from "../constants/interactiveEffects.consts";
import { ROTATION_UNIFORMS } from "./effects/rotation-effects/rotationEffect.consts";
export const VERTEX_POINT_NAME = "currentVertexPoint";
export const VERTEX_NORMAL_NAME = "currentVertexNormal";

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
  [VERTEX_EFFECTS.IMAGE_TO_POINTS]: {
    uniforms: IMAGE_TO_POINTS_UNIFORMS,
    attributes: IMAGE_TO_POINTS_ATTRIBUTES,
    transforms: [QUAD_MESH_TRANSFORM],
  },
  [VERTEX_EFFECTS.EXPLODE]: {
    uniforms: EXPLODE_UNIFORMS,
    attributes: EXPLODE_ATTRIBUTES,
    functions: [],
  },
  [VERTEX_EFFECTS.AFFECTED_POSITION]: {
    uniforms: AFFECTED_POSITION_UNIFORMS,
    attributes: AFFECTED_POSITION_ATTRIBUTES,

    functions: [],
  },
  [VERTEX_EFFECTS.ROTATION]: {
    uniforms: ROTATION_UNIFORMS,
    attributes: [],
    functions: [],
  },
};
