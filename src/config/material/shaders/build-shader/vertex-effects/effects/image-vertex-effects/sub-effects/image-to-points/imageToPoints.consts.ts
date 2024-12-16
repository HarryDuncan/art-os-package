import { VaryingConfig } from "../../../../../types";
import { IMAGE_VERTEX_EFFECT } from "../../../../vertexEffects.consts";

export const DEFAULT_IMAGE_TO_POINTS_EFFECT_PROPS = {
  declareInTransform: true,
  effectType: IMAGE_VERTEX_EFFECT.IMAGE_TO_POINTS,
  effectProps: {},
};
export const IMAGE_TO_POINTS_UNIFORM_CONFIG = {
  defaultUniforms: [],
  customUniforms: [],
};
export const IMAGE_TO_POINTS_VARYING_CONFIG = [] as VaryingConfig[];
export const IMAGE_TO_POINTS_REQUIRED_FUNCTIONS = [];
export const IMAGE_TO_POINTS_ATTRIBUTE_CONFIG = [];
