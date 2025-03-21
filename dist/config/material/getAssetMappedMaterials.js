"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetMappedMaterials = void 0;
const materials_consts_1 = require("./materials.consts");
const getMaterial_1 = require("./getMaterial");
const getAssetMappedMaterials = (materialConfig, assets) => materialConfig.flatMap((configItem) => {
    if (!materials_consts_1.ASSET_MAPPED_MATERIALS.includes(configItem.materialType)) {
        return [];
    }
    const mappedAsset = assets.find((asset) => asset.id === configItem.materialProps.assetId);
    if (mappedAsset) {
        const material = formatMaterial(configItem, mappedAsset);
        if (material) {
            material.name = configItem.id;
            return material;
        }
        return [];
    }
    return [];
});
exports.getAssetMappedMaterials = getAssetMappedMaterials;
const formatMaterial = (configItem, mappedAsset) => {
    switch (configItem.materialType) {
        case materials_consts_1.MATERIAL_TYPES.ENV_MAP: {
            getEnvMapMaterial(configItem.materialProps, mappedAsset);
            break;
        }
        case materials_consts_1.MATERIAL_TYPES.VIDEO: {
            return getVideoMaterial(configItem.materialProps, mappedAsset);
        }
        case materials_consts_1.MATERIAL_TYPES.MATCAP: {
            return getMatcapMaterial(configItem.materialProps, mappedAsset);
        }
        default:
            return null;
    }
};
const getMatcapMaterial = (materialProps, asset) => {
    materialProps.matcap = asset.data;
    return (0, getMaterial_1.getMaterial)(materials_consts_1.MATERIAL_TYPES.MATCAP, materialProps);
};
const getEnvMapMaterial = (materialProps, asset) => {
    materialProps.imageUrl = asset.path;
    return (0, getMaterial_1.getMaterial)(materials_consts_1.MATERIAL_TYPES.ENV_MAP, materialProps);
};
const getVideoMaterial = (materialProps, asset) => {
    materialProps.videoId = asset.id;
    return (0, getMaterial_1.getMaterial)(materials_consts_1.MATERIAL_TYPES.VIDEO, materialProps);
};
