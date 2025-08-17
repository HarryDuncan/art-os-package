import { Vector2 } from "three";
import { Asset } from "../../../assets/types";
import { MeshTransformConfig, TransformValueConfig } from "../../config.types";
import {
  ASSET_MAPPING_RELATIONSHIPS,
  MESH_TRANSFORM_TYPES,
} from "../../material/shaders/schema";
import { ASSET_TYPES } from "../../../assets/consts";

const TRANSFORM_SORTING = [
  MESH_TRANSFORM_TYPES.SET_UP_QUAD,
  MESH_TRANSFORM_TYPES.MORPH,
  MESH_TRANSFORM_TYPES.CUSTOM_ATTRIBUTES,
];

export const formatMeshTransforms = (
  meshTransforms: MeshTransformConfig[],
  assets: Asset[]
) => {
  // Sort transforms to ensure SET_UP_QUAD is first, then MORPH, then CUSTOM_ATTRIBUTES
  const sortedTransforms = [...meshTransforms].sort((a, b) => {
    const indexA = TRANSFORM_SORTING.indexOf(a.type as string);
    const indexB = TRANSFORM_SORTING.indexOf(b.type as string);
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
      const selectedAsset = assets.find((asset) => asset.guid === assetId);
      console.log("selectedAsset", selectedAsset);
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
  console.log("asset", asset);
  if (asset.assetType === ASSET_TYPES.VIDEO) {
    const video = document.getElementById(asset.guid);
    console.log("video", video);
    const width = video?.clientWidth;
    const height = video?.clientHeight;
    return new Vector2(width, height);
  } else {
    // @ts-expect-error
    const { width, height } = asset.data.image;
    return new Vector2(width, height);
  }
};
