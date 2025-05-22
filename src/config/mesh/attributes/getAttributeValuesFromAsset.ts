import { Asset } from "../../../types";
import { Texture, Vector2 } from "three";
import { ParameterConfig } from "../../../types/materials/index";
import { ASSET_MAPPING_RELATIONSHIPS } from "../../../consts";

export const getAttributeValuesFromAssets = (
  attributeConfigs: ParameterConfig[],
  assets: Asset[]
) =>
  attributeConfigs.map((config) => {
    if (
      config.isAttribute &&
      config.isAssetMapped &&
      config.assetMappingConfig
    ) {
      const { assetId, relationship } = config.assetMappingConfig;
      const selectedAsset = assets.find((asset) => asset.id === assetId);
      if (selectedAsset) {
        switch (relationship) {
          case ASSET_MAPPING_RELATIONSHIPS.DIMENSION: {
            const value = getDimensionAttributeValues(selectedAsset);
            return { ...config, value };
          }
          default:
            console.warn(`No configuration for ${relationship}`);
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
