"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseDownTransform = exports.traverseTransform = exports.distortVaryings = exports.distortUniforms = exports.distortFunctions = void 0;
const noise3d_1 = require("../../../../../../../../config/material/shaders/build-shader/shader-properties/functions/noise/noise3d");
const vertexEffects_consts_1 = require("../../../vertexEffects.consts");
const distortFunctions = () => [
    { id: "noise", functionDefinition: noise3d_1.noise3D },
];
exports.distortFunctions = distortFunctions;
const distortUniforms = () => ({
    defaultUniforms: [],
    customUniforms: [{ id: "uTraverseProgress", valueType: "FLOAT", value: 0 }],
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
const traverseTransform = () => {
    const uniformConfig = (0, exports.distortUniforms)();
    const transformation = (0, exports.traverseDownTransform)();
    const requiredFunctions = (0, exports.distortFunctions)();
    return {
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig: [],
        attributeConfig: [],
    };
};
exports.traverseTransform = traverseTransform;
const traverseDownTransform = () => {
    return `
    // Generate random offset for each vertex (compute once)
    float randomOffsetX = (${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz.x + 0.0) * 1.0 * uTraverseProgress;
    float randomOffsetY = (${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz.y + 100.0) * 1.0 * uTraverseProgress;
    float randomOffsetZ = (${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz.z + 0.0) * 1.0 * uTraverseProgress;
  
    // Apply random offset to the vertex position with downward displacement
    vec4 ${vertexEffects_consts_1.VERTEX_POINT_NAME} = vec4(
      ${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz + vec3(randomOffsetX, randomOffsetY, randomOffsetZ),
      1.0
    );
  
    // If the vertex has fallen completely, reset its position
    if (uTraverseProgress >= 1.0) {
      ${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz = ${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz;
    }
    `;
};
exports.traverseDownTransform = traverseDownTransform;
