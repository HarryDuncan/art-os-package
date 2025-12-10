import { FILE_TYPES } from "../../../consts";
import { Asset, LoadedGroup, LoadedObjChild } from "../../../assets/types";
import { getFileTypeFromFilename } from "../../../utils/file/file";
import { ASSET_TYPES } from "../../../assets/consts";
import { Texture } from "three";
import {
  createPlaneFromDimensions,
  createPlaneFromTexture,
} from "./createPlaneFromTexture";
import { MeshComponentConfig } from "../../config.types";
import { MeshType } from "../../../assets/geometry/geometry.types";

export const getAssetGeometry = (
  asset: Asset,
  meshComponentConfig: MeshComponentConfig
) => {
  const { meshType, geometryConfig } = meshComponentConfig;
  const { assetType, path: assetPath, data, name } = asset;
  const path = assetPath ?? "";
  if (assetType === ASSET_TYPES.VIDEO) {
    const video = document.getElementById(
      asset.guid
    ) as HTMLVideoElement | null;
    const width = (video as HTMLVideoElement)?.videoWidth;
    const height = (video as HTMLVideoElement)?.videoHeight;
    const geometry = createPlaneFromDimensions(
      width ?? 1,
      height ?? 1,
      geometryConfig?.scale ?? 1,
      meshType as MeshType
    );
    const positionOffset = {
      x: width !== 0 ? -(width / 2) : 0,
      y: height !== 0 ? -(height / 2) : 0,
      z: 0,
    };
    return [
      {
        name: asset.name,
        geometry,
        isCustomGeometry: true,
        positionOffset,
      },
    ];
  }
  if (assetType === ASSET_TYPES.TEXTURE) {
    const texture = data as Texture;
    const geometry = createPlaneFromTexture(texture, meshType as MeshType);
    const width = texture.image?.width ?? 0;
    const height = texture.image?.height ?? 0;
    const positionOffset = {
      x: width !== 0 ? width / 2 : 0,
      y: height !== 0 ? height / 2 : 0,
      z: 0,
    };
    return [
      {
        name: asset.name,
        geometry,
        isCustomGeometry: true,
        positionOffset,
      },
    ];
  }
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

// export const getAssetBufferGeometry = (asset: Asset) => {
//   const assetGeometry = getAssetGeometry(asset);
//   if (assetGeometry) {
//     return assetGeometry[0].geometry;
//   }
//   console.warn(`no buffer geometry found for ${asset.name}`);
// };
