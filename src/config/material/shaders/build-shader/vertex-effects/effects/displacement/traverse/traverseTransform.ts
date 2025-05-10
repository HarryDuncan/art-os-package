import { noise3D } from "../../../../../../../../config/material/shaders/build-shader/shader-properties/functions/noise/noise3d";
import {
  VaryingConfig,
  UniformConfig,
} from "../../../../../../../../types/materials/index";
import { VERTEX_POINT_NAME } from "../../../vertexEffects.consts";
import { VertexEffectData } from "../../../vertexEffects.types";

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

export const traverseTransform = (): VertexEffectData => {
  const uniformConfig = distortUniforms() as UniformConfig;
  const transformation = traverseDownTransform();
  const requiredFunctions = distortFunctions();
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig: [],
    attributeConfig: [],
  };
};

export const traverseDownTransform = () => {
  return `
    // Generate random offset for each vertex (compute once)
    float randomOffsetX = (${VERTEX_POINT_NAME}.xyz.x + 0.0) * 1.0 * uTraverseProgress;
    float randomOffsetY = (${VERTEX_POINT_NAME}.xyz.y + 100.0) * 1.0 * uTraverseProgress;
    float randomOffsetZ = (${VERTEX_POINT_NAME}.xyz.z + 0.0) * 1.0 * uTraverseProgress;
  
    // Apply random offset to the vertex position with downward displacement
    vec4 ${VERTEX_POINT_NAME} = vec4(
      ${VERTEX_POINT_NAME}.xyz + vec3(randomOffsetX, randomOffsetY, randomOffsetZ),
      1.0
    );
  
    // If the vertex has fallen completely, reset its position
    if (uTraverseProgress >= 1.0) {
      ${VERTEX_POINT_NAME}.xyz = ${VERTEX_POINT_NAME}.xyz;
    }
    `;
};
