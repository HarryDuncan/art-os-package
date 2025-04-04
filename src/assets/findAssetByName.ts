import { Asset } from "./../types";

export const findAssetByName = (assets: Asset[], assetName: string) => {
  const selectedAsset = assets.find(({ name }) => name === assetName);
  if (selectedAsset) return selectedAsset;
  console.warn(`${assetName} was not found`);
  return null;
};
