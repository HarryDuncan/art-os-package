import { noise, fade, transitionalNoise } from "./noise";
import { noise3D, virusNoise } from "./noise3d";
import { noise4D } from "./noise4d";
import { simplePerlinNoise } from "./perlinNoise";
import { voronoiNoise } from "./voronoiNoise";
import { FUNCTION_TYPES } from "../../../constants/buildShader.consts";

export const noiseFunction = {
  id: "noise",
  functionDefinition: noise,
  functionType: FUNCTION_TYPES.STATIC,
};

export const fadeFunction = {
  id: "fade",
  functionDefinition: fade,
};

export const transitionalNoiseFunction = {
  id: "transitionalNoise",
  functionDefinition: transitionalNoise,
};

export const noise3dFunction = {
  id: "noise3D",
  functionDefinition: noise3D,
};

export const virusNoiseFunction = {
  id: "virusNoise",
  functionDefinition: virusNoise.functionDefinition,
  functionType: FUNCTION_TYPES.STATIC,
};

export const noise4dFunction = {
  id: "noise4D",
  functionDefinition: noise4D,
};

export const perlinNoiseFunction = {
  id: "simplePerlinNoise",
  functionDefinition: simplePerlinNoise,
};

export const voronoiNoiseFunction = {
  id: "voronoiNoise",
  functionDefinition: voronoiNoise,
  functionType: FUNCTION_TYPES.STATIC,
};
