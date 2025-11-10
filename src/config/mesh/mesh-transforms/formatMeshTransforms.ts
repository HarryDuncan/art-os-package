import { Vector2 } from "three";
import { Asset } from "../../../assets/types";
import { MeshTransformConfig, TransformValueConfig } from "../../config.types";
import { ASSET_MAPPING_RELATIONSHIPS } from "../../material/shaders/schema";
import { ASSET_TYPES } from "../../../assets/consts";
import { getAssetGeometry } from "../geometry/getAssetGeometries";
import { getNormals, getVertices } from "./attribute.functions";

export const formatMeshTransforms = (
  meshTransforms: MeshTransformConfig[],
  assets: Asset[]
) => {
  return meshTransforms.map((transform) => {
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
      if (selectedAsset) {
        switch (relationship) {
          case ASSET_MAPPING_RELATIONSHIPS.DIMENSION: {
            const value = getDimensionAttributeValues(selectedAsset);
            return { ...acc, [key]: { value, type, relationship } };
          }
          case ASSET_MAPPING_RELATIONSHIPS.NORMAL: {
            const assetGeometry = getAssetGeometry(selectedAsset);
            if (assetGeometry) {
              const normals = getNormals(assetGeometry[0].geometry);
              return { ...acc, [key]: { value: normals, type, relationship } };
            }
            break;
          }
          case ASSET_MAPPING_RELATIONSHIPS.VERTEX_POINT: {
            const assetGeometry = getAssetGeometry(selectedAsset);
            if (assetGeometry) {
              const positions = getVertices(assetGeometry[0].geometry);
              return {
                ...acc,
                [key]: { value: positions, type, relationship },
              };
            }
            break;
          }
          default: {
            console.warn(`No configuration for ${relationship}`);
            return { ...acc, [key]: { value, type, relationship } };
          }
        }
      }
    }
    return { ...acc, [key]: { value, type } };
  }, {});

const getDimensionAttributeValues = (asset: Asset) => {
  if (asset.assetType === ASSET_TYPES.VIDEO) {
    const video = document.getElementById(asset.guid) as HTMLVideoElement;
    const width = video?.videoWidth;
    const height = video?.videoHeight;
    return new Vector2(width, height);
  } else {
    // @ts-expect-error
    const { width, height } = asset.data.image;
    return new Vector2(width, height);
  }
};
