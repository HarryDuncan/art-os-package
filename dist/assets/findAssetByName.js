export const findAssetByName = (assets, assetName) => {
    const selectedAsset = assets.find(({ name }) => name === assetName);
    if (selectedAsset)
        return selectedAsset;
    console.warn(`${assetName} was not found`);
    return null;
};
