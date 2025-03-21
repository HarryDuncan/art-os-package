"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noiseTransitionTransform = void 0;
const shaderConversions_1 = require("../../../../../../../../../utils/conversion/shaderConversions");
const noise3d_1 = require("../../../../../shader-properties/functions/noise/noise3d");
const steps_1 = require("../../../../../shader-properties/functions/steps/steps");
const vertexEffects_consts_1 = require("../../../../vertexEffects.consts");
const noiseTransitionTransform = (noiseTransitionProps) => {
    const { effectStrength, noiseUniformName } = noiseTransitionProps;
    const effectUniforms = {
        defaultUniforms: [],
        customUniforms: [{ id: noiseUniformName, valueType: "FLOAT", value: 1.0 }],
    };
    const effectVaryings = [];
    const effectFunctions = [steps_1.zeroToZeroParabola, noise3d_1.virusNoise];
    const effectAttributes = [];
    const transformation = `
  ${cloudTransform(effectStrength, noiseUniformName)}
  ${vertexEffects_consts_1.VERTEX_POINT_NAME} = vec4(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz + (noiseTransitionPosition * vec3(zeroToZeroParabola(uProgress))), 1.0);`;
    return {
        transformation,
        effectUniforms,
        effectVaryings,
        VERTEX_POINT_NAME: vertexEffects_consts_1.VERTEX_POINT_NAME,
        effectFunctions,
        effectAttributes,
    };
};
exports.noiseTransitionTransform = noiseTransitionTransform;
const cloudTransform = (effectStrength, noiseUniformName) => {
    return `
    vec3 location = vec3(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz);
    float pattern = virusNoise(location)  * ${noiseUniformName} * ${(0, shaderConversions_1.shaderSafeFloat)(effectStrength / 2)};
    vec3 distortion = pattern * vec3(clamp(0.23 , 0.23, 0.23));
    vec3 noiseTransitionPosition = ${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz  * distortion;
    `;
};
