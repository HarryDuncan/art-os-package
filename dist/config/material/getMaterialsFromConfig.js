"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaterialsFromConfig = void 0;
const materialConfigToMaterial_1 = require("./materialConfigToMaterial");
const materials_consts_1 = require("./materials.consts");
const getMaterialsFromConfig = (config) => {
    const { globalMaterialConfigs } = config;
    if (globalMaterialConfigs) {
        return globalMaterialConfigs.flatMap((materialConfig) => {
            return !materials_consts_1.SHADER_MATERIALS.includes(materialConfig.materialType) &&
                !materials_consts_1.ASSET_MAPPED_MATERIALS.includes(materialConfig.materialType)
                ? (0, materialConfigToMaterial_1.materialConfigToMaterial)(materialConfig)
                : [];
        });
    }
    return [];
};
exports.getMaterialsFromConfig = getMaterialsFromConfig;
