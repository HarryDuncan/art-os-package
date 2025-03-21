"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpVertexEffects = void 0;
const reduceFunctions_1 = require("../helpers/reduceFunctions");
const mergeAttributeConfigs_1 = require("../shader-properties/attributes/helpers/mergeAttributeConfigs");
const mergeUniformConfigs_1 = require("../shader-properties/uniforms/helpers/mergeUniformConfigs");
const mergeVaryingConfigs_1 = require("../shader-properties/varyings/helpers/mergeVaryingConfigs");
const getVertexEffect_1 = require("./effects/getVertexEffect");
const vertexEffects_consts_1 = require("./vertexEffects.consts");
const mergeStructConfigs_1 = require("../shader-properties/structs/mergeStructConfigs");
const setUpVertexEffects = (vertexEffects) => {
    const { uniformConfigs, varyingConfigs, transformations, requiredFunctions, attributeConfigs, structConfigs, } = getVertexTransformations(vertexEffects);
    const viewMatrix = `gl_Position = projectionMatrix * modelViewMatrix * vec4(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz, 1.0);`;
    return {
        uniformConfigs,
        varyingConfigs,
        transformations,
        requiredFunctions,
        viewMatrix,
        attributeConfigs,
        structConfigs,
    };
};
exports.setUpVertexEffects = setUpVertexEffects;
const getVertexTransformations = (vertexEffects) => {
    const unmergedUniformConfigs = [];
    const unmergedVaryingConfigs = [];
    const unmergedTransformations = [];
    const allRequiredFunctions = [];
    const unmergedStructConfigs = [];
    const unmergedAttributeConfigs = [];
    vertexEffects.forEach((effect) => {
        const { uniformConfig, varyingConfig, transformation, requiredFunctions, attributeConfig = [], structConfigs = [], } = (0, getVertexEffect_1.getVertexEffect)(effect);
        unmergedUniformConfigs.push(uniformConfig);
        unmergedVaryingConfigs.push(varyingConfig);
        unmergedAttributeConfigs.push(attributeConfig);
        unmergedTransformations.push(transformation);
        allRequiredFunctions.push(requiredFunctions);
        unmergedStructConfigs.push(structConfigs);
    });
    const mergedUniformConfigs = (0, mergeUniformConfigs_1.mergeUniformConfigs)(unmergedUniformConfigs);
    const mergedVaryingConfigs = (0, mergeVaryingConfigs_1.mergeVaryingConfigs)(unmergedVaryingConfigs);
    const mergedRequiredFunction = (0, reduceFunctions_1.reduceFunctions)(allRequiredFunctions);
    const mergedAttributeConfigs = (0, mergeAttributeConfigs_1.mergeAttributeConfigs)(unmergedAttributeConfigs);
    const mergedStructConfigs = (0, mergeStructConfigs_1.mergeStructConfigs)(unmergedStructConfigs);
    const transformations = unmergedTransformations.join("");
    return {
        uniformConfigs: mergedUniformConfigs,
        varyingConfigs: mergedVaryingConfigs,
        transformations,
        requiredFunctions: mergedRequiredFunction,
        attributeConfigs: mergedAttributeConfigs,
        structConfigs: mergedStructConfigs,
    };
};
