import { Asset } from "../../../types";
import { Texture, Vector2 } from "three";
import { AttributeConfig } from "../../../types/materials/index";
import { ASSET_MAPPING_RELATIONSHIPS } from "../../../consts";

export const getAttributeValuesFromAssets = (
  attributeConfigs: AttributeConfig[],
  assets: Asset[]
) =>
  attributeConfigs.map((config) => {
    if (config.assetId) {
      const selectedAsset = assets.find((asset) => asset.id === config.assetId);
      if (selectedAsset) {
        switch (config.relationship) {
          case ASSET_MAPPING_RELATIONSHIPS.DIMENSION: {
            const value = getDimensionAttributeValues(selectedAsset);
            return { ...config, value };
          }
          default:
            console.warn(`No configuration for ${config.relationship}`);
            return config;
        }
      }
    }
    return config;
  });

const getDimensionAttributeValues = (asset: Asset) => {
  const { image } = asset.data as Texture;
  const { width, height } = image;
  return new Vector2(width, height);
};
