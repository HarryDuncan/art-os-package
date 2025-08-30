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

        // Append to the element with id 'append-container' if it exists, otherwise fallback to body
        const appendContainer = document.getElementById("append-container");
        if (appendContainer) {
          appendContainer.appendChild(video);
        } else {
          document.body.appendChild(video);
        }
      }

      // Wait until the video is mounted and playing before continuing
      // We want to ensure the video is in the DOM and has started playing
      async function waitForVideoToPlay(vid: HTMLVideoElement): Promise<void> {
        // Wait for the video element to be in the DOM
        if (!document.body.contains(vid)) {
          await new Promise<void>((resolve) => {
            const observer = new MutationObserver(() => {
              if (document.body.contains(vid)) {
                observer.disconnect();
                resolve();
              }
            });
            observer.observe(document.body, { childList: true, subtree: true });
          });
        }

        // Wait for the video to be able to play
        if (vid.readyState < 2) {
          await new Promise<void>((resolve) => {
            const onCanPlay = () => {
              vid.removeEventListener("canplay", onCanPlay);
              resolve();
            };
            vid.addEventListener("canplay", onCanPlay);
          });
        }

        // Try to play the video if not already playing
        if (vid.paused) {
          try {
            await vid.play();
          } catch {
            // Autoplay might fail, but that's okay
          }
        }

        // Wait for the video to actually start playing
        if (vid.paused) {
          await new Promise<void>((resolve) => {
            const onPlaying = () => {
              vid.removeEventListener("playing", onPlaying);
              resolve();
            };
            vid.addEventListener("playing", onPlaying);
          });
        }
      }

      await waitForVideoToPlay(video);

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
