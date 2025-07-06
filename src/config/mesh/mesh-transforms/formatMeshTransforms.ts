import { Asset } from "../../../types";
import { Texture, Vector2 } from "three";
import {
  ASSET_MAPPING_RELATIONSHIPS,
  MESH_TRANSFORM_TYPE,
} from "../../../consts";
import {
  MeshTransformConfig,
  TransformValueConfig,
} from "../../../types/config.types";

const TRANSFORM_SORTING = [
  MESH_TRANSFORM_TYPE.SET_UP_QUAD,
  MESH_TRANSFORM_TYPE.MORPH,
  MESH_TRANSFORM_TYPE.CUSTOM_ATTRIBUTES,
];

export const formatMeshTransforms = (
  meshTransforms: MeshTransformConfig[],
  assets: Asset[]
) => {
  // Sort transforms to ensure SET_UP_QUAD is first, then MORPH, then CUSTOM_ATTRIBUTES
  const sortedTransforms = [...meshTransforms].sort((a, b) => {
    const indexA = TRANSFORM_SORTING.indexOf(a.type);
    const indexB = TRANSFORM_SORTING.indexOf(b.type);
    return indexA - indexB;
  });

  return sortedTransforms.map((transform) => {
    const { values } = transform;
    const attributeValues = getAttributeValuesFromAssets(values ?? {}, assets);
    return {
      ...transform,
      values: attributeValues,
    };
  });
};

export const getAttributeValuesFromAssets = (
  values: Record<string, TransformValueConfig>,
  assets: Asset[]
) =>
  Object.entries(values).reduce((acc, [key, { value, type }]) => {
    if (
      value &&
      typeof value === "object" &&
      "assetId" in value &&
      "relationship" in value
    ) {
      const { assetId, relationship } = value as {
        assetId: string;
        relationship: string;
      };
      const selectedAsset = assets.find((asset) => asset.id === assetId);
      if (selectedAsset) {
        switch (relationship) {
          case ASSET_MAPPING_RELATIONSHIPS.DIMENSION: {
            const value = getDimensionAttributeValues(selectedAsset);
            return { ...acc, [key]: { value, type } };
          }
          default:
            console.warn(`No configuration for ${relationship}`);
            return { ...acc, [key]: { value, type } };
        }
      }
    }
    return { ...acc, [key]: { value, type } };
  }, {});

const getDimensionAttributeValues = (asset: Asset) => {
  const { image } = asset.data as Texture;
  const { width, height } = image;
  return new Vector2(width, height);
};
