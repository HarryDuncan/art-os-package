"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAssetByName = void 0;
const findAssetByName = (assets, assetName) => {
    const selectedAsset = assets.find(({ name }) => name === assetName);
    if (selectedAsset)
        return selectedAsset;
    console.warn(`${assetName} was not found`);
    return null;
};
exports.findAssetByName = findAssetByName;
