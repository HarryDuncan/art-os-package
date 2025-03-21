"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeUniformConfigs = void 0;
const removeDuplicatesByKey_1 = require("../../../../../../../utils/removeDuplicatesByKey");
const uniforms_consts_1 = require("../uniforms.consts");
const mergeUniformConfigs = (uniformConfigArray) => {
    const filteredUniformConfigs = uniformConfigArray.flatMap((config) => config !== null && config !== void 0 ? config : []);
    const mergedUniformConfig = Object.assign({}, uniforms_consts_1.EMPTY_UNIFORM_CONFIG);
    filteredUniformConfigs.forEach(({ defaultUniforms, customUniforms }) => {
        const { defaultUniforms: currentDefaults, customUniforms: currentCustom } = mergedUniformConfig;
        const updatedDefaults = [...currentDefaults, ...defaultUniforms].filter((value, index, self) => self.indexOf(value) === index);
        mergedUniformConfig.defaultUniforms = updatedDefaults;
        mergedUniformConfig.customUniforms = mergeCustomUniforms(currentCustom, customUniforms);
    });
    return mergedUniformConfig;
};
exports.mergeUniformConfigs = mergeUniformConfigs;
const mergeCustomUniforms = (currentCustomUniforms = [], addedCustomUniforms = []) => {
    const customUniforms = currentCustomUniforms || [];
    const uniformsToBeMerged = addedCustomUniforms || [];
    return (0, removeDuplicatesByKey_1.removeDuplicatesByKey)([...customUniforms, ...uniformsToBeMerged], "id");
};
