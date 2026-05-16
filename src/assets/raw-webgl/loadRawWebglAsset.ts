import { Asset } from "../types";
import { ASSET_TYPES } from "../consts";
import { loadRawTexture } from "./loadRawTexture";

export const loadRawWebglAsset = async (asset: Asset) => {
  const path = asset.path ?? "";
  switch (asset.assetType) {
    case ASSET_TYPES.TEXTURE: {
      return loadRawTexture(path);
    }
    case ASSET_TYPES.MODEL3D:
    case ASSET_TYPES.ADVANCED_3D:
    case ASSET_TYPES.IMAGE:
    case ASSET_TYPES.VIDEO:
    case ASSET_TYPES.FONT:
    case ASSET_TYPES.SVG:
    default: {
      // TODO: implement raw-webgl loader for `${asset.assetType}`.
      //       MODEL3D / ADVANCED_3D need a non-three GLTF/OBJ parser.
      //       IMAGE / SVG / FONT can use native browser APIs.
      //       VIDEO can be ported from useAssets (DOM-only, three-free).
      console.warn(
        `raw-webgl loader for asset type "${asset.assetType}" not implemented`,
      );
      return null;
    }
  }
};
