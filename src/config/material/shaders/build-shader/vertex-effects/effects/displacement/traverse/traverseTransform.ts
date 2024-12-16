import { UniformConfig, VaryingConfig } from "../../../../types";
import { VERTEX_EFFECT_POINT_NAMES } from "../../../vertexEffects.consts";
import { VertexEffectData } from "../../../vertexEffects.types";
import { noise3D } from "display/materials/webgl-shaders/shader-functions/noise/simplex/noise3D";

export const distortFunctions = () => [
  { id: "noise", functionDefinition: noise3D },
];

export const distortUniforms = () => ({
  defaultUniforms: [],
  customUniforms: [{ id: "uTraverseProgress", valueType: "FLOAT", value: 0 }],
});

export const distortVaryings = () =>
  [
    { id: "vPosition", valueType: "VEC3", varyingType: "DEFAULT" },
    {
      id: "vNormal",
      valueType: "VEC3",
      varyingType: "CUSTOM",
      value: "twistedNormal.xyz",
    },
  ] as VaryingConfig[];

export const traverseTransform = (
  previousPointName: string
): VertexEffectData => {
  const pointName = VERTEX_EFFECT_POINT_NAMES.TRAVERSE_POINT;
  const uniformConfig = distortUniforms() as UniformConfig;
  const transformation = traverseDownTransform(previousPointName, pointName);
  const requiredFunctions = distortFunctions();
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig: [],
    attributeConfig: [],
    pointName,
  };
};

export const traverseDownTransform = (
  previousPointName: string,
  pointName: string
) => {
  return `
    // Generate random offset for each vertex (compute once)
    float randomOffsetX = (${previousPointName}.xyz.x + 0.0) * 1.0 * uTraverseProgress;
    float randomOffsetY = (${previousPointName}.xyz.y + 100.0) * 1.0 * uTraverseProgress;
    float randomOffsetZ = (${previousPointName}.xyz.z + 0.0) * 1.0 * uTraverseProgress;
  
    // Apply random offset to the vertex position with downward displacement
    vec4 ${pointName} = vec4(
      ${previousPointName}.xyz + vec3(randomOffsetX, randomOffsetY, randomOffsetZ),
      1.0
    );
  
    // If the vertex has fallen completely, reset its position
    if (uTraverseProgress >= 1.0) {
      ${pointName}.xyz = ${previousPointName}.xyz;
    }
    `;
};
