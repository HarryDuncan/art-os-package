"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distortionEffect = void 0;
const distortionTransform_1 = require("./distortionTransform");
const distortion_defaults_1 = require("./distortion.defaults");
const formatVertexParameters_1 = require("../../../../helpers/formatVertexParameters");
const mergeUniformConfigs_1 = require("../../../../shader-properties/uniforms/helpers/mergeUniformConfigs");
const reduceFunctions_1 = require("../../../../helpers/reduceFunctions");
const distortionEffect = (effectProps) => {
    const distortionEffectParameters = (0, formatVertexParameters_1.formatVertexParameters)(effectProps, distortion_defaults_1.DEFAULT_DISTORTION_EFFECT_PARAMETERS);
    const { transformation, uniformConfig: effectUniformConfig, requiredFunctions: effectFunctions, } = (0, distortionTransform_1.distortionTransform)(distortionEffectParameters);
    const requiredFunctions = (0, reduceFunctions_1.reduceFunctions)([
        distortion_defaults_1.DEFAULT_DISTORT_FUNCTIONS,
        effectFunctions,
    ]);
    const uniformConfig = (0, mergeUniformConfigs_1.mergeUniformConfigs)([
        distortion_defaults_1.DEFAULT_DISTORT_UNIFORMS,
        effectUniformConfig,
    ]);
    const varyingConfig = distortion_defaults_1.DEFAULT_DISTORT_VARYINGS;
    return {
        attributeConfig: [],
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
    };
};
exports.distortionEffect = distortionEffect;
