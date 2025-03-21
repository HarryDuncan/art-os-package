"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageAsMask = void 0;
const imageAsMask_consts_1 = require("./imageAsMask.consts");
const imageAsMaskTransform_1 = require("./imageAsMaskTransform");
const imageAsMask = (_effectProps = {}) => {
    const { transform } = (0, imageAsMaskTransform_1.imageAsMaskTransform)();
    const mergedUniformConfigs = imageAsMask_consts_1.IMAGE_AS_MASK_UNIFORMS;
    const mergedVaryings = imageAsMask_consts_1.IMAGE_AS_MASK_VARYINGS;
    const mergedAttributes = imageAsMask_consts_1.IMAGE_AS_MASK_ATTRIBUTES;
    const requiredFunctions = imageAsMask_consts_1.IMAGE_AS_MASK_FUNCTIONS;
    return {
        requiredFunctions,
        uniformConfig: mergedUniformConfigs,
        transformation: transform,
        varyingConfig: mergedVaryings,
        attributeConfig: mergedAttributes,
    };
};
exports.imageAsMask = imageAsMask;
