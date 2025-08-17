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
  // initializedAssets is null before loading, then always an array (possibly empty)
  const [initializedAssets, setInitializedAssets] = useState<Asset[] | null>(
    null
  );

  async function loadAssetData(asset: Asset) {
    const loadedAsset = await loadAsset(asset);
    if (!loadedAsset) {
      console.warn(`asset ${asset.path} not properly loaded`);
    }
    return { ...asset, data: loadedAsset };
  }

  const initializeAssets = useCallback(async () => {
    if (!assets) return [];
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
    let isMounted = true;
    async function getAssets() {
      // If assets is null/undefined, treat as empty array
      const loadedAssets = await initializeAssets();
      if (isMounted) {
        setAreAssetsInitialized(true);
        setInitializedAssets(loadedAssets ?? []);
      }
    }
    getAssets();
    return () => {
      isMounted = false;
    };
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
      console.log("loading texture", path);
      const texture = await loadTexture(path);
      return texture;
    }
    case ASSET_TYPES.IMAGE: {
      const image = await loadImage(path);
      return image;
    }
    case ASSET_TYPES.VIDEO: {
      // Check if a video element with this id already exists before creating/appending
      let video = document.getElementById(
        asset.guid
      ) as HTMLVideoElement | null;
      if (!video) {
        video = document.createElement("video");
        video.src = path;
        video.id = asset.guid;
        video.crossOrigin = "anonymous";
        video.autoplay = true;
        video.muted = true; // Most browsers require muted for autoplay to work
        video.loop = true; // keep replaying
        video.playsInline = true;

        // Append to the element with id 'append-container' if it exists, otherwise fallback to body
        const appendContainer = document.getElementById("append-container");
        if (appendContainer) {
          appendContainer.appendChild(video);
        } else {
          document.body.appendChild(video);
        }

        // Wait for the video to start playing before returning
        try {
          await video.play();
        } catch (e) {
          // Autoplay might fail, but that's okay
        }
      } else {
        // If the video already exists, ensure it's playing before returning
        if (video.paused) {
          try {
            await video.play();
          } catch (e) {
            // Autoplay might fail, but that's okay
          }
        }
      }
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
