"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageToPoints = void 0;
const formatVertexParameters_1 = require("../../../../../helpers/formatVertexParameters");
const reduceFunctions_1 = require("../../../../../helpers/reduceFunctions");
const mergeAttributeConfigs_1 = require("../../../../../shader-properties/attributes/helpers/mergeAttributeConfigs");
const mergeUniformConfigs_1 = require("../../../../../shader-properties/uniforms/helpers/mergeUniformConfigs");
const mergeVaryingConfigs_1 = require("../../../../../shader-properties/varyings/helpers/mergeVaryingConfigs");
const imageToPoints_consts_1 = require("./imageToPoints.consts");
const imageToPointsTransform_1 = require("./imageToPointsTransform");
const imageToPoints = (effectProps) => {
    const imageToPointsEffectProps = (0, formatVertexParameters_1.formatVertexParameters)(effectProps, imageToPoints_consts_1.DEFAULT_IMAGE_TO_POINTS_EFFECT_PROPS);
    const { transformation, effectUniforms, effectVaryings, effectFunctions, effectAttributes, } = (0, imageToPointsTransform_1.imageToPointsTransform)(imageToPointsEffectProps);
    const uniformConfig = imageToPoints_consts_1.IMAGE_TO_POINTS_UNIFORM_CONFIG;
    const varyingConfig = imageToPoints_consts_1.IMAGE_TO_POINTS_VARYING_CONFIG;
    const requiredFunctions = imageToPoints_consts_1.IMAGE_TO_POINTS_REQUIRED_FUNCTIONS;
    const attributeConfig = imageToPoints_consts_1.IMAGE_TO_POINTS_ATTRIBUTE_CONFIG;
    const mergedUniformConfigs = (0, mergeUniformConfigs_1.mergeUniformConfigs)([
        effectUniforms,
        uniformConfig,
    ]);
    const mergedVaryingConfigs = (0, mergeVaryingConfigs_1.mergeVaryingConfigs)([
        effectVaryings,
        varyingConfig,
    ]);
    const mergedRequiredFunction = (0, reduceFunctions_1.reduceFunctions)([
        effectFunctions,
        requiredFunctions,
    ]);
    const mergedAttributeConfigs = (0, mergeAttributeConfigs_1.mergeAttributeConfigs)([
        attributeConfig,
        effectAttributes,
    ]);
    return {
        requiredFunctions: mergedRequiredFunction,
        uniformConfig: mergedUniformConfigs,
        attributeConfig: mergedAttributeConfigs,
        transformation,
        varyingConfig: mergedVaryingConfigs,
    };
};
exports.imageToPoints = imageToPoints;
