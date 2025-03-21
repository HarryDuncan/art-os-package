"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.perlinNoiseEffect = void 0;
const perlinNoise_1 = require("../../../../../shader-properties/functions/noise/perlinNoise");
const vertexEffects_consts_1 = require("../../../../vertexEffects.consts");
const noise_consts_1 = require("../noise.consts");
const perlinNoiseEffect = () => {
    const requiredFunctions = [
        {
            id: "simplePerlinNoise",
            functionDefinition: perlinNoise_1.simplePerlinNoise,
        },
    ];
    const transform = `
          ${vertexEffects_consts_1.VERTEX_POINT_NAME} = vec4( simplePerlinNoise(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz) , 1.0);
  `;
    const uniformConfig = noise_consts_1.NOISE_UNIFORMS;
    return { transform, requiredFunctions, uniformConfig };
};
exports.perlinNoiseEffect = perlinNoiseEffect;
