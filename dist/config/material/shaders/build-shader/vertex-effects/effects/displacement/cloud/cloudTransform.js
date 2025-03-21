"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudTransform = exports.noiseCloudTransform = exports.cloudEffect = exports.distortVaryings = exports.distortUniforms = exports.distortFunctions = void 0;
const noise3d_1 = require("../../../../../../../../config/material/shaders/build-shader/shader-properties/functions/noise/noise3d");
const vertexEffects_consts_1 = require("../../../vertexEffects.consts");
const distortFunctions = () => [
    { id: "noise", functionDefinition: noise3d_1.noise3D },
];
exports.distortFunctions = distortFunctions;
const distortUniforms = () => ({
    defaultUniforms: ["uStrength"],
    customUniforms: [{ id: "uAngle", valueType: "FLOAT", value: 1.5 }],
});
exports.distortUniforms = distortUniforms;
const distortVaryings = () => [
    { id: "vPosition", valueType: "VEC3", varyingType: "DEFAULT" },
    {
        id: "vNormal",
        valueType: "VEC3",
        varyingType: "CUSTOM",
        value: "twistedNormal.xyz",
    },
];
exports.distortVaryings = distortVaryings;
const cloudEffect = () => {
    const uniformConfig = (0, exports.distortUniforms)();
    const varyingConfig = [];
    const transformation = (0, exports.noiseCloudTransform)();
    const requiredFunctions = (0, exports.distortFunctions)();
    return {
        attributeConfig: [],
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
    };
};
exports.cloudEffect = cloudEffect;
const noiseCloudTransform = () => {
    return `// Generate random offset for each vertex (compute once)
  float randomOffsetX = noise3D(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz + vec3(0.0, 0.0, 0.0) ) * 1.0 * 0.0;
  float randomOffsetY = noise3D(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz + vec3(1.0, 1.0, 1.0)) * 1.0 * uStrength;
  float randomOffsetZ = noise3D(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz + vec3(2.0, 2.0, 2.0)) * 1.0 * uStrength;
  // Apply random offset to the vertex position
  vec4 ${vertexEffects_consts_1.VERTEX_POINT_NAME} = vec4(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz + vec3(randomOffsetX, randomOffsetY, randomOffsetZ), 1.0);
`;
};
exports.noiseCloudTransform = noiseCloudTransform;
const cloudTransform = (VERTEX_POINT_NAME, pointName) => {
    return `// Generate random offset for each vertex (compute once)
       float randomOffsetX = (fract(sin(dot(${VERTEX_POINT_NAME}.xyz, vec3(12.9898, 78.233, 45.543))) * 43758.5453) - 0.5) * 1.0 * uStrength;
       float randomOffsetY = (fract(sin(dot(${VERTEX_POINT_NAME}.xyz, vec3(12.9898, 78.233, 45.543) + 1.0)) * 43758.5453) - 0.5) * 1.0 * 0;
       float randomOffsetZ = (fract(sin(dot(${VERTEX_POINT_NAME}.xyz, vec3(12.9898, 78.233, 45.543) + 2.0)) * 43758.5453) - 0.5) * 1.0 * 0;
   
       // Apply random offset to the vertex position
       vec4 ${pointName} = vec4(${VERTEX_POINT_NAME}.xyz + vec3(randomOffsetX, randomOffsetY, randomOffsetZ), 1.0);
   `;
};
exports.cloudTransform = cloudTransform;
