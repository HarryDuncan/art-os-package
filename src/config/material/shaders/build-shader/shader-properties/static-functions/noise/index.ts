import { noise, fade, transitionalNoise } from "./noise";
import { noise3D, virusNoise } from "./noise3d";
import { noise4D } from "./noise4d";
import { simplePerlinNoise } from "./perlinNoise";
import { voronoiNoise } from "./voronoiNoise";
import { FUNCTION_TYPES } from "../../../constants/buildShader.consts";

export const noiseFunction = {
  id: "noise",
  functionName: "noise",
  functionDefinition: noise,
  functionType: FUNCTION_TYPES.STATIC,
};

export const fadeFunction = {
  id: "fade",
  functionName: "fade",
  functionDefinition: fade,
  functionType: FUNCTION_TYPES.STATIC,
};

export const transitionalNoiseFunction = {
  id: "transitionalNoise",
  functionName: "transitionalNoise",
  functionDefinition: transitionalNoise,
  functionType: FUNCTION_TYPES.STATIC,
};

export const noise3dFunction = {
  id: "noise3D",
  functionName: "noise3D",
  functionDefinition: noise3D,
  functionType: FUNCTION_TYPES.STATIC,
};

export const virusNoiseFunction = {
  id: "virusNoise",
  functionName: "virusNoise",
  functionDefinition: virusNoise.functionDefinition,
  functionType: FUNCTION_TYPES.STATIC,
};

export const noise4dFunction = {
  id: "noise4D",
  functionName: "noise4D",
  functionDefinition: noise4D,
  functionType: FUNCTION_TYPES.STATIC,
};

export const perlinNoiseFunction = {
  id: "simplePerlinNoise",
  functionName: "simplePerlinNoise",
  functionDefinition: simplePerlinNoise,
  functionType: FUNCTION_TYPES.STATIC,
};

export const voronoiNoiseFunction = {
  id: "voronoiNoise",
  functionName: "voronoiNoise",
  functionDefinition: voronoiNoise,
  functionType: FUNCTION_TYPES.STATIC,
};
