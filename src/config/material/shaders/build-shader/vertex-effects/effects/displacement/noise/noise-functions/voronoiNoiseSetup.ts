import { orthogonal } from "../../../../../shader-properties/functions/maths/maths";
import { voronoiNoise } from "../../../../../shader-properties/functions/noise/voronoiNoise";
import { VORONOI_UNIFORMS } from "../noise.consts";

export const voronoiNoiseSetup = (pointName) => {
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
          ${pointName} = vec3( voronoiNoise(${pointName}, transformedNormal) );
  `;

  const uniformConfig = VORONOI_UNIFORMS;
  return { transform, requiredFunctions, uniformConfig };
};
