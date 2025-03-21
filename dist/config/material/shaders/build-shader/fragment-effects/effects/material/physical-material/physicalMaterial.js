"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.physicalMaterial = void 0;
const physicalMaterialTransform_1 = require("./physicalMaterialTransform");
const physicalMaterial_consts_1 = require("./physicalMaterial.consts");
const physicalMaterial = (effectProps = {}) => {
    const { transform } = (0, physicalMaterialTransform_1.physicalMaterialTransform)();
    const uniformConfig = physicalMaterial_consts_1.PHYSICAL_MATERIAL_UNIFORM_CONFIG;
    const varyingConfig = physicalMaterial_consts_1.PHYSICAL_MATERIAL_VARYING_CONFIG;
    const requiredFunctions = physicalMaterial_consts_1.PHYSICAL_MATERIAL_REQUIRED_FUNCTIONS;
    const structConfigs = physicalMaterial_consts_1.PHYSICAL_MATERIAL_STRUCT_CONFIG;
    return {
        requiredFunctions,
        uniformConfig,
        transformation: transform,
        varyingConfig,
        attributeConfig: [],
        structConfigs,
    };
};
exports.physicalMaterial = physicalMaterial;
