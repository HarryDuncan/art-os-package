import { noise, fade, transitionalNoise } from "./noise";
import { noise3D, virusNoise } from "./noise3d";
import { noise4D } from "./noise4d";
import { simplePerlinNoise } from "./perlinNoise";
import { voronoiNoise } from "./voronoiNoise";
import { FUNCTION_TYPES } from "../../../../generator/consts";

export const noiseFunction = {
  key: "noise",
  functionName: "noise",
  functionDefinition: noise,
  functionType: FUNCTION_TYPES.STATIC,
};

export const fadeFunction = {
  key: "fade",
  functionName: "fade",
  functionDefinition: fade,
  functionType: FUNCTION_TYPES.STATIC,
};

export const transitionalNoiseFunction = {
  key: "transitionalNoise",
  functionName: "transitionalNoise",
  functionDefinition: transitionalNoise,
  functionType: FUNCTION_TYPES.STATIC,
};

export const noise3dFunction = {
  key: "noise3D",
  functionName: "noise3D",
  functionDefinition: noise3D,
  functionType: FUNCTION_TYPES.STATIC,
};

export const virusNoiseFunction = {
  key: "virusNoise",
  functionName: "virusNoise",
  functionDefinition: virusNoise.functionDefinition,
  functionType: FUNCTION_TYPES.STATIC,
};

export const noise4dFunction = {
  key: "noise4D",
  functionName: "noise4D",
  functionDefinition: noise4D,
  functionType: FUNCTION_TYPES.STATIC,
};

export const perlinNoiseFunction = {
  key: "simplePerlinNoise",
  functionName: "simplePerlinNoise",
  functionDefinition: simplePerlinNoise,
  functionType: FUNCTION_TYPES.STATIC,
};

export const voronoiNoiseFunction = {
  key: "voronoiNoise",
  functionName: "voronoiNoise",
  functionDefinition: voronoiNoise,
  functionType: FUNCTION_TYPES.STATIC,
};
