import { VaryingConfig } from "../../../../../types";
import { IMAGE_VERTEX_EFFECT } from "../../../../vertexEffects.consts";

export const DEFAULT_IMAGE_AS_MASK_EFFECT_PROPS = {
  declareInTransform: true,
  effectType: IMAGE_VERTEX_EFFECT.IMAGE_AS_MASK,
  removedColors: ["#ffffff"],
};
export const IMAGE_AS_MASK_UNIFORM_CONFIG = {
  defaultUniforms: [],
  customUniforms: [],
};
export const IMAGE_AS_MASK_VARYING_CONFIG = [] as VaryingConfig[];
export const IMAGE_AS_MASK_REQUIRED_FUNCTIONS = [];
export const IMAGE_AS_MASK_ATTRIBUTE_CONFIG = [];
