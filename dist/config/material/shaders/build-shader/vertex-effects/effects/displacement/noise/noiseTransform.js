"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudTransform = exports.noiseCloudTransform = exports.noiseTransform = void 0;
const shaderConversions_1 = require("../../../../../../../../utils/conversion/shaderConversions");
const vertexEffects_consts_1 = require("../../../vertexEffects.consts");
const perlinNoiseEffect_1 = require("./noise-functions/perlinNoiseEffect");
const voronoiNoiseSetup_1 = require("./noise-functions/voronoiNoiseSetup");
const noise_consts_1 = require("./noise.consts");
const noiseTransform = (noiseParameters) => {
    const { transform, requiredFunctions, uniformConfig } = getEffectData(noiseParameters);
    const transformation = `
        // NOISE VERTEX POSITIONS
     
        ${transform}
      `;
    return {
        transformation,
        requiredFunctions,
        uniformConfig,
    };
};
exports.noiseTransform = noiseTransform;
const getEffectData = (noiseParameters) => {
    const { effectStrength, noiseType } = noiseParameters;
    switch (noiseType) {
        case noise_consts_1.NOISE_EFFECT_TYPES.VORONOI:
            return (0, voronoiNoiseSetup_1.voronoiNoiseSetup)();
        case noise_consts_1.NOISE_EFFECT_TYPES.PERLIN:
            return (0, perlinNoiseEffect_1.perlinNoiseEffect)();
        case noise_consts_1.NOISE_EFFECT_TYPES.NORMAL:
        default:
            const transform = (0, exports.cloudTransform)(effectStrength);
            return {
                transform,
                requiredFunctions: noise_consts_1.NOISE_FUNCTIONS,
                uniformConfig: noise_consts_1.NOISE_UNIFORMS,
            };
    }
};
const noiseCloudTransform = (effectStrength) => {
    return `// Generate random offset for each vertex (compute once)
  float randomOffsetX = noise3D(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz + vec3(0.0, 0.0, 0.0) ) * ${(0, shaderConversions_1.shaderSafeFloat)(effectStrength)} * uNoiseStrength;
  float randomOffsetY = noise3D(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz + vec3(1.0, 1.0, 1.0))  * ${(0, shaderConversions_1.shaderSafeFloat)(effectStrength)} * uNoiseStrength;
  float randomOffsetZ = noise3D(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz + vec3(2.0, 2.0, 2.0))  * ${(0, shaderConversions_1.shaderSafeFloat)(effectStrength)} * uNoiseStrength;

  // Apply random offset to the vertex position
  vec4 ${vertexEffects_consts_1.VERTEX_POINT_NAME} = vec4(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz + vec3(randomOffsetX, randomOffsetY, randomOffsetZ), 1.0);
`;
};
exports.noiseCloudTransform = noiseCloudTransform;
const cloudTransform = (effectStrength) => {
    return `// Generate random offset for each vertex (compute once)
       float randomOffsetX = (fract(sin(dot(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz, vec3(12.9898, 78.233, 45.543))) * 43758.5453) - 0.5) *  ${(0, shaderConversions_1.shaderSafeFloat)(effectStrength)} * uNoiseStrength;
       float randomOffsetY = (fract(sin(dot(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz, vec3(12.9898, 78.233, 45.543) + 1.0)) * 43758.5453) - 0.5) * 1.0 * 0.0;
       float randomOffsetZ = (fract(sin(dot(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz, vec3(12.9898, 78.233, 45.543) + 2.0)) * 43758.5453) - 0.5) * 1.0 * 0.0 ;
   
       // Apply random offset to the vertex position
       ${vertexEffects_consts_1.VERTEX_POINT_NAME} = vec4(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz + vec3(randomOffsetX, randomOffsetY, randomOffsetZ), 1.0).xyz;
   `;
};
exports.cloudTransform = cloudTransform;
