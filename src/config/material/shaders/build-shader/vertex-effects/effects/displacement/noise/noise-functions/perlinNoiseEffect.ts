import { simplePerlinNoise } from "../../../../../shader-properties/functions/noise/perlinNoise";
import { NOISE_UNIFORMS } from "../noise.consts";

export const perlinNoiseEffect = (pointName) => {
  const requiredFunctions = [
    {
      id: "simplePerlinNoise",
      functionDefinition: simplePerlinNoise,
    },
  ];
  const transform = `
     

          ${pointName} = vec3( simplePerlinNoise(${pointName}.xyz) );
  `;

  const uniformConfig = NOISE_UNIFORMS;
  return { transform, requiredFunctions, uniformConfig };
};
