import { orthogonal } from "../../../../../shader-properties/functions/maths/maths";
import { voronoiNoise } from "../../../../../shader-properties/functions/noise/voronoiNoise";

import { VERTEX_POINT_NAME } from "../../../../../../../../../consts/materials/vertexEffects.consts";
import { VORONOI_UNIFORMS } from "../noise.consts";

export const voronoiNoiseSetup = () => {
  const requiredFunctions = [
    { id: "orthogonal", functionDefinition: orthogonal },
    {
      id: "voronoiNoise",
      functionDefinition: voronoiNoise,
    },
  ];
  const transform = `
     
          vec3 transformedNormal = normal.xyz;
          transformedNormal = normalMatrix * transformedNormal;
          vNormal = normalize( transformedNormal );
          ${VERTEX_POINT_NAME} = vec4( voronoiNoise(${VERTEX_POINT_NAME}.xyz, transformedNormal) 1.0);
  `;

  const uniformConfig = VORONOI_UNIFORMS;
  return { transform, requiredFunctions, uniformConfig };
};
