import { useCallback, useEffect, useState } from "react";
import { Asset } from "./types";
import { getFileTypeFromFilename } from "../utils/file/file";
import { loadFont } from "./fonts/loadFont";
import { loadImage } from "./image/load-image/LoadImage";
import { loadSvg } from "./svg/loadSvg";
import { loadTexture } from "./texture/load-texture/loadTexture";
import { loadModel } from "./geometry/load-model/LoadModel";
import { loadAdvancedScene } from "./advanced-scene/loadAdvancedScene";
import { ASSET_TYPES } from "./consts";

export const useAssets = (
  assets: Asset[] | undefined | null,
  assetPath?: string
) => {
  const [areAssetsInitialized, setAreAssetsInitialized] = useState(false);
  const [initializedAssets, setInitializedAssets] = useState<Asset[]>([]);

  async function loadAssetData(asset: Asset) {
    const loadedAsset = await loadAsset(asset);
    if (!loadedAsset) {
      console.warn(`asset ${asset.path} not properly loaded`);
    }
    return { ...asset, data: loadedAsset };
  }
  const initializeAssets = useCallback(async () => {
    if (!assets) return;
    const loadedAssets = await Promise.all(
      assets.flatMap(async (asset) => {
        if (!assetPath && !asset.path) {
          console.warn(
            `asset ${asset.guid} not properly loaded no assetPath or path found`
          );
        }
        const formattedAsset = assetPath
          ? { ...asset, path: `${assetPath}/${asset.fileName}` }
          : asset;
        return loadAssetData(formattedAsset);
      })
    );
    return loadedAssets as Asset[];
  }, [assets, assetPath]);

  useEffect(() => {
    async function getAssets() {
      const loadedAssets = await initializeAssets();
      if (loadedAssets) {
        setAreAssetsInitialized(true);
        setInitializedAssets(loadedAssets);
      }
    }
    getAssets();
  }, [assets, initializeAssets]);

  return { initializedAssets, areAssetsInitialized };
};

const loadAsset = async (asset: Asset) => {
  const { assetType, path: assetPath } = asset;
  const path = assetPath ?? "";
  const fileType = getFileTypeFromFilename(path);
  switch (assetType) {
    case ASSET_TYPES.MODEL3D: {
      const geometry = await loadModel(path, fileType);
      return geometry;
    }
    case ASSET_TYPES.ADVANCED_3D: {
      const advancedScene = await loadAdvancedScene(path, fileType);
      return advancedScene;
    }
    case ASSET_TYPES.TEXTURE: {
      const texture = await loadTexture(path);
      return texture;
    }
    case ASSET_TYPES.IMAGE: {
      const image = await loadImage(path);
      return image;
    }
    case ASSET_TYPES.VIDEO: {
      return path;
    }
    case ASSET_TYPES.FONT: {
      const loadedFont = await loadFont(path);
      return loadedFont;
    }
    case ASSET_TYPES.SVG: {
      const svg = await loadSvg(path);
      return svg;
    }
    default: {
      return null;
    }
  }
};
