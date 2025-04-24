import { VaryingConfig } from "../../../../../../../types/materials/shaders/buildShader.types";
import { IMAGE_VERTEX_EFFECT } from "../../../../../../../consts/materials/vertexEffects.consts";

export const DEFAULT_IMAGE_VERTEX_EFFECT_PROPS = {
  declareInTransform: true,
  effectType: IMAGE_VERTEX_EFFECT.IMAGE_TO_POINTS,
  effectProps: {},
};
export const IMAGE_VERTEX_UNIFORM_CONFIG = {
  defaultUniforms: [],
  customUniforms: [],
};
export const IMAGE_VERTEX_VARYING_CONFIG = [] as VaryingConfig[];
export const IMAGE_VERTEX_REQUIRED_FUNCTIONS = [];
export const IMAGE_VERTEX_ATTRIBUTE_CONFIG = [];
