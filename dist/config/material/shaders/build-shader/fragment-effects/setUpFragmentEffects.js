"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFragmentColors = exports.setUpFragmentEffects = void 0;
const defaultFragmentEffect_1 = require("./effects/defaultFragmentEffect/defaultFragmentEffect");
const getFragmentEffects_1 = require("./effects/getFragmentEffects");
const mergeUniformConfigs_1 = require("../shader-properties/uniforms/helpers/mergeUniformConfigs");
const mergeVaryingConfigs_1 = require("../shader-properties/varyings/helpers/mergeVaryingConfigs");
const reduceFunctions_1 = require("../helpers/reduceFunctions");
const mergeAttributeConfigs_1 = require("../shader-properties/attributes/helpers/mergeAttributeConfigs");
const mergeStructConfigs_1 = require("../shader-properties/structs/mergeStructConfigs");
const fragmentEffects_consts_1 = require("./fragmentEffects.consts");
const setUpFragmentEffects = (fragmentEffects) => {
    const { varyingConfigs, uniformConfigs, transformations, attributeConfigs, requiredFunctions, structConfigs, } = (0, exports.getFragmentColors)(fragmentEffects);
    const fragColor = `gl_FragColor = ${fragmentEffects_consts_1.FRAG_COLOR_NAME};`;
    return {
        fragColor,
        varyingConfigs,
        uniformConfigs,
        transformations,
        attributeConfigs,
        requiredFunctions,
        structConfigs,
    };
};
exports.setUpFragmentEffects = setUpFragmentEffects;
const getFragmentColors = (fragmentEffects) => {
    const { unmergedVaryingConfigs, unmergedUniformConfigs, unmergedTransformations, unmergedAttributeConfigs, unmergedStructConfigs, } = setUpInitialParameters();
    const allRequiredFunctions = [];
    fragmentEffects.forEach((effect) => {
        const { varyingConfig, uniformConfig, transformation, requiredFunctions, attributeConfig, structConfigs = [], } = (0, getFragmentEffects_1.getFragmentEffects)(effect);
        unmergedVaryingConfigs.push(varyingConfig);
        unmergedUniformConfigs.push(uniformConfig);
        unmergedAttributeConfigs.push(attributeConfig);
        unmergedTransformations.push(transformation);
        unmergedStructConfigs.push(structConfigs);
        allRequiredFunctions.push(requiredFunctions);
    });
    const mergedUniformConfigs = (0, mergeUniformConfigs_1.mergeUniformConfigs)(unmergedUniformConfigs);
    const mergedVaryingConfigs = (0, mergeVaryingConfigs_1.mergeVaryingConfigs)(unmergedVaryingConfigs);
    const mergedAttributeConfigs = (0, mergeAttributeConfigs_1.mergeAttributeConfigs)(unmergedAttributeConfigs);
    const mergedRequiredFunction = (0, reduceFunctions_1.reduceFunctions)(allRequiredFunctions);
    const mergedStructConfigs = (0, mergeStructConfigs_1.mergeStructConfigs)(unmergedStructConfigs);
    const mergedTransformations = unmergedTransformations.join("");
    return {
        varyingConfigs: mergedVaryingConfigs,
        uniformConfigs: mergedUniformConfigs,
        transformations: mergedTransformations,
        attributeConfigs: mergedAttributeConfigs,
        requiredFunctions: mergedRequiredFunction,
        structConfigs: mergedStructConfigs,
    };
};
exports.getFragmentColors = getFragmentColors;
const setUpInitialParameters = () => {
    const { varyingConfig, uniformConfig, transformation, attributeConfig } = (0, defaultFragmentEffect_1.defaultFragmentEffect)();
    const unmergedVaryingConfigs = [varyingConfig];
    const unmergedUniformConfigs = [uniformConfig];
    const unmergedTransformations = [transformation];
    const unmergedAttributeConfigs = [attributeConfig];
    return {
        unmergedVaryingConfigs,
        unmergedUniformConfigs,
        unmergedTransformations,
        unmergedAttributeConfigs,
        unmergedStructConfigs: [],
    };
};
