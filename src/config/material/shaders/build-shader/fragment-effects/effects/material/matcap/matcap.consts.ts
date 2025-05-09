import {
  DefaultUniform,
  UniformConfig,
  VaryingConfig,
} from "../../../../buildShader.types";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../../constants/shader.consts";
import {
  matcapFunction,
  textureLevel,
} from "../../../../shader-properties/functions/matcapFunctions";
import { calculateNormal } from "../../../../shader-properties/functions/maths/maths";
import { VARYING_TYPES } from "../../../../shader-properties/varyings/varyings.consts";

export const DEFAULT_MATCAP_UNIFORMS = {
  defaultUniforms: ["uMaterial", "uResolution"] as DefaultUniform[],
  customUniforms: [
    {
      id: "uLightDir",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
    },
  ],
} as UniformConfig;

export const DEFAULT_MATCAP_EFFECT_PROPS = {};

export const MATCAP_REQUIRED_FUNCTIONS = [
  { id: "calculateNormal", functionDefinition: calculateNormal },
  { id: "matcap", functionDefinition: matcapFunction },
  { id: "textureLevel", functionDefinition: textureLevel },
];
export const MATCAP_VARYINGS = [
  {
    id: "vEye",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  },

  {
    id: "vPosition",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  },
  {
    id: "vNormal",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  },
  {
    id: "vUv",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
  },
] as VaryingConfig[];
