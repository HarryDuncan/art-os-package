import { UniformConfig } from "../../../../../../../types/materials/shaders/buildShader.types";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../../../../../consts/materials/shader.consts";

import { simplePerlinNoise } from "../../../shader-properties/functions/noise/perlinNoise";
import { VARYING_TYPES } from "../../../shader-properties/varyings/varyings.consts";

export const VANISH_FUNCTIONS = [
  { id: "simplePerlinNoise", functionDefinition: simplePerlinNoise },
];

export const VANISH_UNIFORMS = {
  defaultUniforms: ["uProgress"],
  customUniforms: [
    {
      id: "uNumberOfRings",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: 100,
    },
    {
      id: "uSpread",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: 0.772,
    },
    {
      id: "uNoise",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: 0.18,
    },
    {
      id: "uDisplacement",
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: 22.0,
    },
  ],
} as UniformConfig;

export const VANISH_VARYINGS = [
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
];

export const VANISH_ATTRIBUTES = [];

export const DEFAULT_VANISH_EFFECT_PARAMS = {
  vanishHeight: 3.5,
};
