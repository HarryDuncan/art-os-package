import { shaderSafeFloat } from "../../../../../../../../utils/conversion/shaderConversions";
import { NoiseEffectProps, UniformConfig } from "../../../../types";
import { perlinNoiseEffect } from "./noise-functions/perlinNoiseEffect";
import { voronoiNoiseSetup } from "./noise-functions/voronoiNoiseSetup";
import {
  NOISE_EFFECT_TYPES,
  NOISE_FUNCTIONS,
  NOISE_UNIFORMS,
} from "./noise.consts";

export const noiseTransform = (
  previousPointName: string,
  pointName: string,
  noiseParameters: NoiseEffectProps
) => {
  const { declareInTransform } = noiseParameters;
  const vertexPointInstantiation = `vec3 ${pointName} = ${previousPointName}.xyz;`;
  const { transform, requiredFunctions, uniformConfig } = getEffectData(
    previousPointName,
    pointName,
    noiseParameters
  );
  const transformation = `
        // NOISE VERTEX POSITIONS
        ${declareInTransform ? vertexPointInstantiation : ""}
        ${transform}
      `;
  return {
    vertexPointInstantiation,
    transformation,
    requiredFunctions,
    uniformConfig,
  };
};

const getEffectData = (
  previousPointName: string,
  pointName: string,
  noiseParameters: NoiseEffectProps
) => {
  const { effectStrength, noiseType } = noiseParameters;
  switch (noiseType) {
    case NOISE_EFFECT_TYPES.VORONOI:
      return voronoiNoiseSetup(pointName);
    case NOISE_EFFECT_TYPES.PERLIN:
      return perlinNoiseEffect(pointName);
    case NOISE_EFFECT_TYPES.NORMAL:
    default:
      const transform = cloudTransform(
        previousPointName,
        pointName,
        effectStrength
      );
      return {
        transform,
        requiredFunctions: NOISE_FUNCTIONS,
        uniformConfig: NOISE_UNIFORMS as UniformConfig,
      };
  }
};

export const noiseCloudTransform = (
  previousPointName: string,
  pointName: string,
  effectStrength
) => {
  return `// Generate random offset for each vertex (compute once)
  float randomOffsetX = noise3D(${previousPointName}.xyz + vec3(0.0, 0.0, 0.0) ) * ${shaderSafeFloat(
    effectStrength
  )} * uNoiseStrength;
  float randomOffsetY = noise3D(${previousPointName}.xyz + vec3(1.0, 1.0, 1.0))  * ${shaderSafeFloat(
    effectStrength
  )} * uNoiseStrength;
  float randomOffsetZ = noise3D(${previousPointName}.xyz + vec3(2.0, 2.0, 2.0))  * ${shaderSafeFloat(
    effectStrength
  )} * uNoiseStrength;

  // Apply random offset to the vertex position
  vec4 ${pointName} = vec4(${previousPointName}.xyz + vec3(randomOffsetX, randomOffsetY, randomOffsetZ), 1.0);
`;
};
export const cloudTransform = (
  previousPointName: string,
  pointName: string,
  effectStrength
) => {
  return `// Generate random offset for each vertex (compute once)
       float randomOffsetX = (fract(sin(dot(${previousPointName}.xyz, vec3(12.9898, 78.233, 45.543))) * 43758.5453) - 0.5) *  ${shaderSafeFloat(
    effectStrength
  )} * uNoiseStrength;
       float randomOffsetY = (fract(sin(dot(${previousPointName}.xyz, vec3(12.9898, 78.233, 45.543) + 1.0)) * 43758.5453) - 0.5) * 1.0 * 0.0;
       float randomOffsetZ = (fract(sin(dot(${previousPointName}.xyz, vec3(12.9898, 78.233, 45.543) + 2.0)) * 43758.5453) - 0.5) * 1.0 * 0.0 ;
   
       // Apply random offset to the vertex position
       ${pointName} = vec4(${previousPointName}.xyz + vec3(randomOffsetX, randomOffsetY, randomOffsetZ), 1.0).xyz;
   `;
};
