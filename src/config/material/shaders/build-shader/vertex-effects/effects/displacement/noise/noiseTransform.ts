import { shaderSafeFloat } from "../../../../../../../../utils/conversion/shaderConversions";
import { NoiseEffectProps, UniformConfig } from "../../../../types";
import { VERTEX_POINT_NAME } from "../../../vertexEffects.consts";
import { perlinNoiseEffect } from "./noise-functions/perlinNoiseEffect";
import { voronoiNoiseSetup } from "./noise-functions/voronoiNoiseSetup";
import {
  NOISE_EFFECT_TYPES,
  NOISE_FUNCTIONS,
  NOISE_UNIFORMS,
} from "./noise.consts";

export const noiseTransform = (noiseParameters: NoiseEffectProps) => {
  const { transform, requiredFunctions, uniformConfig } =
    getEffectData(noiseParameters);
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

const getEffectData = (noiseParameters: NoiseEffectProps) => {
  const { effectStrength, noiseType } = noiseParameters;
  switch (noiseType) {
    case NOISE_EFFECT_TYPES.VORONOI:
      return voronoiNoiseSetup();
    case NOISE_EFFECT_TYPES.PERLIN:
      return perlinNoiseEffect();
    case NOISE_EFFECT_TYPES.NORMAL:
    default: {
      const transform = cloudTransform(effectStrength);
      return {
        transform,
        requiredFunctions: NOISE_FUNCTIONS,
        uniformConfig: NOISE_UNIFORMS as UniformConfig,
      };
    }
  }
};

export const noiseCloudTransform = (effectStrength) => {
  return `// Generate random offset for each vertex (compute once)
  float randomOffsetX = noise3D(${VERTEX_POINT_NAME}.xyz + vec3(0.0, 0.0, 0.0) ) * ${shaderSafeFloat(
    effectStrength
  )} * uNoiseStrength;
  float randomOffsetY = noise3D(${VERTEX_POINT_NAME}.xyz + vec3(1.0, 1.0, 1.0))  * ${shaderSafeFloat(
    effectStrength
  )} * uNoiseStrength;
  float randomOffsetZ = noise3D(${VERTEX_POINT_NAME}.xyz + vec3(2.0, 2.0, 2.0))  * ${shaderSafeFloat(
    effectStrength
  )} * uNoiseStrength;

  // Apply random offset to the vertex position
  vec4 ${VERTEX_POINT_NAME} = vec4(${VERTEX_POINT_NAME}.xyz + vec3(randomOffsetX, randomOffsetY, randomOffsetZ), 1.0);
`;
};
export const cloudTransform = (effectStrength) => {
  return `// Generate random offset for each vertex (compute once)
       float randomOffsetX = (fract(sin(dot(${VERTEX_POINT_NAME}.xyz, vec3(12.9898, 78.233, 45.543))) * 43758.5453) - 0.5) *  ${shaderSafeFloat(
    effectStrength
  )} * uNoiseStrength;
       float randomOffsetY = (fract(sin(dot(${VERTEX_POINT_NAME}.xyz, vec3(12.9898, 78.233, 45.543) + 1.0)) * 43758.5453) - 0.5) * 1.0 * 0.0;
       float randomOffsetZ = (fract(sin(dot(${VERTEX_POINT_NAME}.xyz, vec3(12.9898, 78.233, 45.543) + 2.0)) * 43758.5453) - 0.5) * 1.0 * 0.0 ;
   
       // Apply random offset to the vertex position
       ${VERTEX_POINT_NAME} = vec4(${VERTEX_POINT_NAME}.xyz + vec3(randomOffsetX, randomOffsetY, randomOffsetZ), 1.0);
   `;
};
