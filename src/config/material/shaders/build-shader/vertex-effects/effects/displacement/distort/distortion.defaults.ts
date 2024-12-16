import { twisterDistortion } from "../../../../shader-properties/functions/distortion/distortion";
import {
  AttributeConfig,
  UniformConfig,
  VaryingConfig,
} from "../../../../types";

export const DEFAULT_DISTORT_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [],
} as UniformConfig;

export const DEFAULT_DISTORT_VARYINGS = [
  { id: "vPosition", valueType: "VEC3", varyingType: "DEFAULT" },
  {
    id: "vNormal",
    valueType: "VEC3",
    varyingType: "CUSTOM",
    value: "twistedNormal.xyz",
  },
] as VaryingConfig[];

export const DEFAULT_DISTORT_FUNCTIONS = [
  { id: "twister", functionDefinition: twisterDistortion },
];
export const DEFAULT_DISTORT_ATTRIBUTES = [] as AttributeConfig[];

export const DEFAULT_DISTORTION_EFFECT_PARAMETERS = {};
