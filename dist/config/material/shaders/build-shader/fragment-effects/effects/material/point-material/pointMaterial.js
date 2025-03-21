"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointMaterial = void 0;
const formatFragmentParameters_1 = require("../../../../helpers/formatFragmentParameters");
const reduceFunctions_1 = require("../../../../helpers/reduceFunctions");
const mergeAttributeConfigs_1 = require("../../../../shader-properties/attributes/helpers/mergeAttributeConfigs");
const mergeUniformConfigs_1 = require("../../../../shader-properties/uniforms/helpers/mergeUniformConfigs");
const mergeVaryingConfigs_1 = require("../../../../shader-properties/varyings/helpers/mergeVaryingConfigs");
const pointMaterial_consts_1 = require("./pointMaterial.consts");
const pointMaterialTransform_1 = require("./pointMaterialTransform");
const pointMaterial = (effectProps = {}) => {
    const formattedProps = (0, formatFragmentParameters_1.formatFragmentParameters)(effectProps, pointMaterial_consts_1.DEFAULT_POINT_MATERIAL_PROPS);
    const { effectUniforms, transform, effectAttributes, effectVaryings, effectRequiredFunctions, } = (0, pointMaterialTransform_1.pointMaterialTransform)(formattedProps);
    const mergedUniformConfigs = (0, mergeUniformConfigs_1.mergeUniformConfigs)([
        effectUniforms,
        pointMaterial_consts_1.POINT_MATERIAL_UNIFORMS,
    ]);
    const mergedVaryings = (0, mergeVaryingConfigs_1.mergeVaryingConfigs)([
        pointMaterial_consts_1.POINT_MATERIAL_VARYINGS,
        effectVaryings,
    ]);
    const mergedAttributes = (0, mergeAttributeConfigs_1.mergeAttributeConfigs)([
        pointMaterial_consts_1.POINT_MATERIAL_ATTRIBUTES,
        effectAttributes,
    ]);
    const requiredFunctions = (0, reduceFunctions_1.reduceFunctions)([
        pointMaterial_consts_1.POINT_MATERIAL_FUNCTIONS,
        effectRequiredFunctions,
    ]);
    return {
        requiredFunctions,
        uniformConfig: mergedUniformConfigs,
        transformation: transform,
        varyingConfig: mergedVaryings,
        attributeConfig: mergedAttributes,
    };
};
exports.pointMaterial = pointMaterial;
