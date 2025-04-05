import { FILE_TYPES } from "../../../consts";
import {
  ASSET_TYPES,
  Asset,
  LoadedGroup,
  LoadedObjChild,
} from "../../../types";
import { getFileTypeFromFilename } from "../../../utils/file/file";

export const getAssetGeometries = (assets: Asset[]) =>
  assets.flatMap((asset) => {
    const geometry = getAssetGeometry(asset);
    return geometry && geometry.length
      ? geometry?.map((geometryItem) => ({
          ...geometryItem,
          assetId: asset.id,
        }))
      : [];
  });

export const getAssetGeometry = (asset: Asset) => {
  const { assetType, path: assetPath, data, name } = asset;
  const path = assetPath ?? "";
  if (assetType !== ASSET_TYPES.MODEL3D || !data) {
    return null;
  }
  const modelFileType = getFileTypeFromFilename(path);
  switch (modelFileType) {
    case FILE_TYPES.MODELS.OBJ:
    case FILE_TYPES.MODELS.GLB:
    case FILE_TYPES.MODELS.GLTF:
      return getObjectGeometries(data as LoadedGroup, name ?? "");
    default:
      console.warn(`no formatting for ${modelFileType}`);
      return null;
  }
};

export const getObjectGeometries = (data: LoadedGroup, name: string) => {
  const { children } = data;

  if (children.length) {
    return children.map((child: LoadedObjChild) => ({
      name: child.name,
      geometry: child.geometry,
    }));
  }
  console.warn(`geometry not valid ${name}`);
  return [];
};

export const getAssetBufferGeometry = (asset: Asset) => {
  const assetGeometry = getAssetGeometry(asset);
  if (assetGeometry) {
    return assetGeometry[0].geometry;
  }
  console.warn(`no buffer geometry found for ${asset.name}`);
};
