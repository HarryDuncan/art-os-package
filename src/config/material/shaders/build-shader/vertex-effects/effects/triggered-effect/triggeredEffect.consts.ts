import {
  UniformConfig,
  VaryingConfig,
} from "../../../../../../../types/materials/shaders/buildShader.types";
import { TriggeredVertexEffect } from "../../../../../../../types/materials/shaders/vertexShader.types";
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

export const DEFAULT_TRIGGERED_EFFECT = {
  declareInTransform: false,
  pointParent: POINT_PARENTS.TRIGGERED,
  effectType: TRIGGERED_FRAGMENT_EFFECT.EMPTY,
} as unknown as Partial<TriggeredVertexEffect>;
