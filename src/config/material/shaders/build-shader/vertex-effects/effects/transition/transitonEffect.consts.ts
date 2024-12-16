import { POINT_PARENTS } from "../../../constants/buildShader.consts";
import {
  TransitionEffectProps,
  UniformConfig,
  VaryingConfig,
} from "../../../types";

export const TRANSITION_UNIFORM_CONFIG = {
  defaultUniforms: [""],
  customUniforms: [],
} as unknown as UniformConfig;

export const TRANSITION_VARYING_CONFIG = [
  {
    id: "vTransition",
    valueType: "FLOAT",
    varyingType: "CUSTOM",
    value: "isTransition",
  },
] as VaryingConfig[];

export const DEFAULT_TRANSITION_EFFECT = {
  declareInTransform: false,
  pointParent: POINT_PARENTS.TRANSITION,
  effectType: "",
} as unknown as Partial<TransitionEffectProps>;
