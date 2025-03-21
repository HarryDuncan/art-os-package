"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phongMaterial = void 0;
const phong_consts_1 = require("./phong.consts");
const phongTransform_1 = require("./phongTransform");
const mergeUniformConfigs_1 = require("../../../../shader-properties/uniforms/helpers/mergeUniformConfigs");
const phongMaterial = (effectProps = {}) => {
    const { transformation } = (0, phongTransform_1.phongTransform)();
    const uniformConfig = (0, mergeUniformConfigs_1.mergeUniformConfigs)([phong_consts_1.DEFAULT_PHONG_UNIFORMS]);
    const varyingConfig = phong_consts_1.PHONG_VARYINGS;
    const requiredFunctions = phong_consts_1.PHONG_REQUIRED_FUNCTIONS;
    return {
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
        attributeConfig: [],
    };
};
exports.phongMaterial = phongMaterial;
