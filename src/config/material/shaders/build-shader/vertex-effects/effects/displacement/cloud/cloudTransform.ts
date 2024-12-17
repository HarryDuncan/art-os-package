import { noise3D } from "../../../../../../../../config/material/shaders/build-shader/shader-properties/functions/noise/noise3d";
import { UniformConfig, VaryingConfig } from "../../../../types";
import { VERTEX_EFFECT_POINT_NAMES } from "../../../vertexEffects.consts";
import { VertexEffectData } from "../../../vertexEffects.types";

export const distortFunctions = () => [
  { id: "noise", functionDefinition: noise3D },
];

export const distortUniforms = () => ({
  defaultUniforms: ["uStrength"],
  customUniforms: [{ id: "uAngle", valueType: "FLOAT", value: 1.5 }],
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

export const cloudEffect = (previousPointName: string): VertexEffectData => {
  const pointName = VERTEX_EFFECT_POINT_NAMES.CLOUD_POINT;
  const uniformConfig = distortUniforms() as UniformConfig;
  const varyingConfig = [] as VaryingConfig[];
  const transformation = noiseCloudTransform(previousPointName, pointName);
  const requiredFunctions = distortFunctions();
  return {
    attributeConfig: [],
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    pointName,
  };
};

export const noiseCloudTransform = (
  previousPointName: string,
  pointName: string
) => {
  return `// Generate random offset for each vertex (compute once)
  float randomOffsetX = noise3D(${previousPointName}.xyz + vec3(0.0, 0.0, 0.0) ) * 1.0 * 0.0;
  float randomOffsetY = noise3D(${previousPointName}.xyz + vec3(1.0, 1.0, 1.0)) * 1.0 * uStrength;
  float randomOffsetZ = noise3D(${previousPointName}.xyz + vec3(2.0, 2.0, 2.0)) * 1.0 * uStrength;

  // Apply random offset to the vertex position
  vec4 ${pointName} = vec4(${previousPointName}.xyz + vec3(randomOffsetX, randomOffsetY, randomOffsetZ), 1.0);
`;
};
export const cloudTransform = (
  previousPointName: string,
  pointName: string
) => {
  return `// Generate random offset for each vertex (compute once)
       float randomOffsetX = (fract(sin(dot(${previousPointName}.xyz, vec3(12.9898, 78.233, 45.543))) * 43758.5453) - 0.5) * 1.0 * uStrength;
       float randomOffsetY = (fract(sin(dot(${previousPointName}.xyz, vec3(12.9898, 78.233, 45.543) + 1.0)) * 43758.5453) - 0.5) * 1.0 * 0;
       float randomOffsetZ = (fract(sin(dot(${previousPointName}.xyz, vec3(12.9898, 78.233, 45.543) + 2.0)) * 43758.5453) - 0.5) * 1.0 * 0;
   
       // Apply random offset to the vertex position
       vec4 ${pointName} = vec4(${previousPointName}.xyz + vec3(randomOffsetX, randomOffsetY, randomOffsetZ), 1.0);
   `;
};
