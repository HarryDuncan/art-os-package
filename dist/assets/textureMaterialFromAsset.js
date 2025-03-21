import { hasCommonValues } from "../utils/hasCommonElement";
import { ASSET_TAG } from "./asset.types";
import { getMaterial } from "../config/material/getMaterial";
import { ENV_MAP_TYPES } from "../config/material/materials.consts";
export const textureMaterialFromAsset = (assets) => sortMaterialsFromAssets(assets).flatMap((asset) => {
    var _a;
    const materialAssetTags = (_a = asset.assetTag) === null || _a === void 0 ? void 0 : _a.flatMap((tag) => ASSET_TAG.MATERIAL[tag] ? tag : []);
    if (materialAssetTags) {
        const materialTag = materialAssetTags[0];
        switch (materialTag) {
            case ASSET_TAG.MATERIAL.MATCAP: {
                const materialProps = {
                    matcap: asset.data,
                };
                const material = getMaterial(materialTag, materialProps);
                material.name = asset.id;
                return material;
            }
            case ASSET_TAG.MATERIAL.ENV_MAP: {
                const materialProps = {
                    imageUrl: asset.path,
                    envMapType: ENV_MAP_TYPES.REFLECTION,
                };
                const material = getMaterial(materialTag, materialProps);
                material.name = asset.id;
                return material;
            }
            default:
                return [];
        }
    }
    return [];
});
const sortMaterialsFromAssets = (assets) => {
    const materialTags = Object.values(ASSET_TAG.MATERIAL);
    const materialAssets = assets.flatMap((asset) => { var _a; return hasCommonValues((_a = asset.assetTag) !== null && _a !== void 0 ? _a : [], materialTags) ? asset : []; });
    return materialAssets;
};
