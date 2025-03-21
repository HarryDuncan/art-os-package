"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textureMaterialFromAsset = void 0;
const hasCommonElement_1 = require("../utils/hasCommonElement");
const asset_types_1 = require("./asset.types");
const getMaterial_1 = require("../config/material/getMaterial");
const materials_consts_1 = require("../config/material/materials.consts");
const textureMaterialFromAsset = (assets) => sortMaterialsFromAssets(assets).flatMap((asset) => {
    var _a;
    const materialAssetTags = (_a = asset.assetTag) === null || _a === void 0 ? void 0 : _a.flatMap((tag) => asset_types_1.ASSET_TAG.MATERIAL[tag] ? tag : []);
    if (materialAssetTags) {
        const materialTag = materialAssetTags[0];
        switch (materialTag) {
            case asset_types_1.ASSET_TAG.MATERIAL.MATCAP: {
                const materialProps = {
                    matcap: asset.data,
                };
                const material = (0, getMaterial_1.getMaterial)(materialTag, materialProps);
                material.name = asset.id;
                return material;
            }
            case asset_types_1.ASSET_TAG.MATERIAL.ENV_MAP: {
                const materialProps = {
                    imageUrl: asset.path,
                    envMapType: materials_consts_1.ENV_MAP_TYPES.REFLECTION,
                };
                const material = (0, getMaterial_1.getMaterial)(materialTag, materialProps);
                material.name = asset.id;
                return material;
            }
            default:
                return [];
        }
    }
    return [];
});
exports.textureMaterialFromAsset = textureMaterialFromAsset;
const sortMaterialsFromAssets = (assets) => {
    const materialTags = Object.values(asset_types_1.ASSET_TAG.MATERIAL);
    const materialAssets = assets.flatMap((asset) => { var _a; return (0, hasCommonElement_1.hasCommonValues)((_a = asset.assetTag) !== null && _a !== void 0 ? _a : [], materialTags) ? asset : []; });
    return materialAssets;
};
