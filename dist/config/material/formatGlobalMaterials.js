"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatGlobalMaterials = void 0;
const getMaterialsFromConfig_1 = require("./getMaterialsFromConfig");
const getShaderMaterials_1 = require("./shaders/getShaderMaterials");
const getAssetMappedMaterials_1 = require("./getAssetMappedMaterials");
const getBuiltShaderMaterials_1 = require("./shaders/getBuiltShaderMaterials");
const formatGlobalMaterials = (assets, config) => {
    var _a;
    const assetMappedMaterials = (0, getAssetMappedMaterials_1.getAssetMappedMaterials)((_a = config === null || config === void 0 ? void 0 : config.globalMaterialConfigs) !== null && _a !== void 0 ? _a : [], assets);
    const shaderMaterials = (0, getShaderMaterials_1.getShaderMaterials)(config, assets);
    const { builtShaders, attributeConfigs } = (0, getBuiltShaderMaterials_1.getBuiltShaderMaterials)(config, assets);
    const globalMaterials = (0, getMaterialsFromConfig_1.getMaterialsFromConfig)(config);
    return {
        materials: [
            ...assetMappedMaterials,
            ...shaderMaterials,
            ...(builtShaders !== null && builtShaders !== void 0 ? builtShaders : []),
            ...globalMaterials,
        ],
        attributeConfigs,
    };
};
exports.formatGlobalMaterials = formatGlobalMaterials;
