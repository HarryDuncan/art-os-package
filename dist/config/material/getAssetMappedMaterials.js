import { ASSET_MAPPED_MATERIALS, MATERIAL_TYPES } from "./materials.consts";
import { getMaterial } from "./getMaterial";
export const getAssetMappedMaterials = (materialConfig, assets) => materialConfig.flatMap((configItem) => {
    if (!ASSET_MAPPED_MATERIALS.includes(configItem.materialType)) {
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
const formatMaterial = (configItem, mappedAsset) => {
    switch (configItem.materialType) {
        case MATERIAL_TYPES.ENV_MAP: {
            getEnvMapMaterial(configItem.materialProps, mappedAsset);
            break;
        }
        case MATERIAL_TYPES.VIDEO: {
            return getVideoMaterial(configItem.materialProps, mappedAsset);
        }
        case MATERIAL_TYPES.MATCAP: {
            return getMatcapMaterial(configItem.materialProps, mappedAsset);
        }
        default:
            return null;
    }
};
const getMatcapMaterial = (materialProps, asset) => {
    materialProps.matcap = asset.data;
    return getMaterial(MATERIAL_TYPES.MATCAP, materialProps);
};
const getEnvMapMaterial = (materialProps, asset) => {
    materialProps.imageUrl = asset.path;
    return getMaterial(MATERIAL_TYPES.ENV_MAP, materialProps);
};
const getVideoMaterial = (materialProps, asset) => {
    materialProps.videoId = asset.id;
    return getMaterial(MATERIAL_TYPES.VIDEO, materialProps);
};
