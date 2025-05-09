import {
  UniformConfig,
  VaryingConfig,
} from "../../../../../../../types/materials/shaders/buildShader.types";
import {
  TriggeredFragmentEffectProps,
  TriggeredFragmentEffect,
} from "../../../../../../../types/materials/shaders/fragmentShader.types";
import { POINT_PARENTS } from "../../../constants/buildShader.consts";
import { TRIGGERED_FRAGMENT_EFFECT } from "../../../../../../../consts/materials/fragmentEffects.consts";

export const TRIGGERED_UNIFORM_CONFIG = {
  defaultUniforms: ["uIsTriggered"],
  customUniforms: [],
} as UniformConfig;

export const TRIGGERED_VARYING_CONFIG = [
  {
    id: "vTriggered",
    valueType: "FLOAT",
    varyingType: "CUSTOM",
    value: "isTriggered",
  },
] as VaryingConfig[];

export const TRIGGERED_FUNCTIONS = [];
export const TRIGGERED_ATTRIBUTE_CONFIGS = [];

export const DEFAULT_TRIGGERED_EFFECT = {
  declareInTransform: false,
  pointParent: POINT_PARENTS.TRIGGERED,
  effectType: TRIGGERED_FRAGMENT_EFFECT.EMPTY,
  effectProps: {} as TriggeredFragmentEffectProps,
} as TriggeredFragmentEffect;
