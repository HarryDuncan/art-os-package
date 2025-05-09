import { VaryingConfig } from "../../../../../../../../types/materials/index";
import { VERTEX_EFFECTS } from "../../../../../../../../consts/materials/vertexEffects.consts";

export const DEFAULT_IMAGE_AS_MASK_EFFECT_PROPS = {
  declareInTransform: true,
  effectType: VERTEX_EFFECTS.IMAGE_AS_MASK,
  removedColors: ["#ffffff"],
};
export const IMAGE_AS_MASK_UNIFORM_CONFIG = {
  defaultUniforms: [],
  customUniforms: [],
};
export const IMAGE_AS_MASK_VARYING_CONFIG = [] as VaryingConfig[];
export const IMAGE_AS_MASK_REQUIRED_FUNCTIONS = [];
export const IMAGE_AS_MASK_ATTRIBUTE_CONFIG = [];
