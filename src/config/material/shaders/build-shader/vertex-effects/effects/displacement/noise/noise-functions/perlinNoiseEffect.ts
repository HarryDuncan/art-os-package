import { simplePerlinNoise } from "../../../../../shader-properties/functions/noise/perlinNoise";
import { VERTEX_POINT_NAME } from "../../../../vertexEffects.consts";
import { NOISE_UNIFORMS } from "../noise.consts";

export const perlinNoiseEffect = () => {
  const requiredFunctions = [
    {
      id: "simplePerlinNoise",
      functionDefinition: simplePerlinNoise,
    },
  ];
  const transform = `
          ${VERTEX_POINT_NAME} = vec4( simplePerlinNoise(${VERTEX_POINT_NAME}.xyz) , 1.0);
  `;

  const uniformConfig = NOISE_UNIFORMS;
  return { transform, requiredFunctions, uniformConfig };
};
