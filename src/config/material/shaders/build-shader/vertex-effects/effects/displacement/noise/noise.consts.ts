import { noise3D } from "../../../../shader-properties/functions/noise/noise3d";
import { UniformConfig } from "../../../../types";

export const NOISE_EFFECT_TYPES = {
  PERLIN: "PERLIN",
  NORMAL: "NORMAL",
  VORONOI: "VORONOI",
};
export const NOISE_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [{ id: "uNoiseStrength", valueType: "FLOAT", value: 1.0 }],
};

export const VORONOI_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [
    { id: "uFrequency", valueType: "FLOAT", value: 2.0 },
    { id: "uNoiseStrength", valueType: "FLOAT", value: 0.0 },
    { id: "uNormalOffset", valueType: "FLOAT", value: 1.0 },
  ],
} as UniformConfig;

export const NOISE_VARYINGS = [
  { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
];

export const DEFAULT_NOISE_PARAMETERS = {
  noiseType: NOISE_EFFECT_TYPES.NORMAL,
  effectStrength: 1.0,
};

export const NOISE_FUNCTIONS = [{ id: "noise", functionDefinition: noise3D }];
