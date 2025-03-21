"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.morphVertex = void 0;
const buildShader_consts_1 = require("../../../constants/buildShader.consts");
const formatVertexParameters_1 = require("../../../helpers/formatVertexParameters");
const reduceFunctions_1 = require("../../../helpers/reduceFunctions");
const mergeAttributeConfigs_1 = require("../../../shader-properties/attributes/helpers/mergeAttributeConfigs");
const mergeUniformConfigs_1 = require("../../../shader-properties/uniforms/helpers/mergeUniformConfigs");
const mergeVaryingConfigs_1 = require("../../../shader-properties/varyings/helpers/mergeVaryingConfigs");
const vertexEffects_consts_1 = require("../../vertexEffects.consts");
const buildMorphTransforms_1 = require("./buildMorphTransforms");
const morphTransitions_1 = require("./morph-transitions/morphTransitions");
const morphVertex_consts_1 = require("./morphVertex.consts");
const setUpMorphObjects_1 = require("./setUpMorphObjects");
const getAttributeConfig = (morphCount) => new Array(morphCount).fill("").flatMap((_value, index) => [
    {
        id: `morphPosition${index}`,
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.VEC3,
    },
    {
        id: `morphNormal${index}`,
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.VEC3,
    },
]);
const morphVertex = (effectProps = {}) => {
    const formattedProps = (0, formatVertexParameters_1.formatVertexParameters)(effectProps, morphVertex_consts_1.DEFAULT_MORPH_EFFECT_PROPS);
    const { morphCount, preTransformConfigs, transitionConfig } = formattedProps;
    const attributeConfig = getAttributeConfig(morphCount);
    const { requiredFunctions, morphObjects, transforms } = (0, setUpMorphObjects_1.setUpMorphObjects)(morphCount, preTransformConfigs);
    const morphTransitionInfo = transitionConfig
        ? (0, morphTransitions_1.morphTransitions)(transitionConfig)
        : null;
    const transformation = `
    vec3 currentPosition = ${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz;
    vec3 currentNormal = ${vertexEffects_consts_1.VERTEX_NORMAL_NAME}.xyz;
    ${transforms.map((value) => `${value} \n `).join(" \n ")}
    vec3 effect_direction = ${morphObjects[0].pointName} - currentPosition;
    vec3 normal_effect_direction = ${morphObjects[0].normalName} - currentNormal;
    ${(0, buildMorphTransforms_1.buildMorphTransforms)(morphObjects)}
    ${vertexEffects_consts_1.VERTEX_POINT_NAME} = vec4(currentPosition + (effect_direction * (uProgress)),1.0);
    ${vertexEffects_consts_1.VERTEX_NORMAL_NAME} = vec4(currentNormal + (normal_effect_direction * (uProgress)), 1.0);
    ${morphTransitionInfo && (morphTransitionInfo === null || morphTransitionInfo === void 0 ? void 0 : morphTransitionInfo.transformation)}
   
    `;
    const mergedRequiredFunctions = (0, reduceFunctions_1.reduceFunctions)([
        requiredFunctions,
        morphTransitionInfo === null || morphTransitionInfo === void 0 ? void 0 : morphTransitionInfo.requiredFunctions,
    ]);
    const mergedUniformConfigs = (0, mergeUniformConfigs_1.mergeUniformConfigs)([
        morphVertex_consts_1.DEFAULT_UNIFORM_CONFIG,
        morphTransitionInfo === null || morphTransitionInfo === void 0 ? void 0 : morphTransitionInfo.uniformConfig,
    ]);
    const mergedVaryingConfigs = (0, mergeVaryingConfigs_1.mergeVaryingConfigs)([
        morphVertex_consts_1.DEFAULT_MORPH_VARYING_CONFIG,
        morphTransitionInfo === null || morphTransitionInfo === void 0 ? void 0 : morphTransitionInfo.varyingConfig,
    ]);
    const mergedAttributeConfigs = (0, mergeAttributeConfigs_1.mergeAttributeConfigs)([
        attributeConfig,
        morphTransitionInfo === null || morphTransitionInfo === void 0 ? void 0 : morphTransitionInfo.attributeConfig,
    ]);
    return {
        requiredFunctions: mergedRequiredFunctions,
        uniformConfig: mergedUniformConfigs,
        transformation,
        attributeConfig: mergedAttributeConfigs,
        varyingConfig: mergedVaryingConfigs,
    };
};
exports.morphVertex = morphVertex;
