"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voronoiNoiseSetup = void 0;
const maths_1 = require("../../../../../shader-properties/functions/maths/maths");
const voronoiNoise_1 = require("../../../../../shader-properties/functions/noise/voronoiNoise");
const vertexEffects_consts_1 = require("../../../../vertexEffects.consts");
const noise_consts_1 = require("../noise.consts");
const voronoiNoiseSetup = () => {
    const requiredFunctions = [
        { id: "orthogonal", functionDefinition: maths_1.orthogonal },
        {
            id: "voronoiNoise",
            functionDefinition: voronoiNoise_1.voronoiNoise,
        },
    ];
    const transform = `
     
          vec3 transformedNormal = normal.xyz;
          transformedNormal = normalMatrix * transformedNormal;
          vNormal = normalize( transformedNormal );
          ${vertexEffects_consts_1.VERTEX_POINT_NAME} = vec4( voronoiNoise(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz, transformedNormal) 1.0);
  `;
    const uniformConfig = noise_consts_1.VORONOI_UNIFORMS;
    return { transform, requiredFunctions, uniformConfig };
};
exports.voronoiNoiseSetup = voronoiNoiseSetup;
