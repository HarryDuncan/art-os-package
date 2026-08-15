import { Asset } from "../types";
import { ASSET_TYPES } from "../consts";
import { loadRawTexture } from "./loadRawTexture";

const loadRawVideo = (asset: Asset): HTMLVideoElement => {
  const path = asset.path ?? "";
  let video = document.getElementById(asset.guid) as HTMLVideoElement | null;

  if (!video) {
    video = document.createElement("video");
    video.id = asset.guid;
    if (/^https?:\/\//i.test(path)) {
      video.crossOrigin = "anonymous";
    }
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.preload = "auto";
    video.playsInline = true;
    video.setAttribute("muted", "true");
    video.setAttribute("loop", "true");
    video.style.display = "none";

    const appendContainer = document.getElementById("append-container");
    (appendContainer ?? document.body).appendChild(video);
  }

  if (video.src !== path) {
    video.src = path;
    video.load();
  }
  void video.play().catch(() => {
    // Muted autoplay can still be deferred until Chromium considers the page
    // active. The element remains available and will play when permitted.
  });

  return video;
};

export const loadRawWebglAsset = async (asset: Asset) => {
  const path = asset.path ?? "";
  switch (asset.assetType) {
    case ASSET_TYPES.TEXTURE: {
      return loadRawTexture(path);
    }
    case ASSET_TYPES.VIDEO: {
      return loadRawVideo(asset);
    }
    case ASSET_TYPES.MODEL3D:
    case ASSET_TYPES.ADVANCED_3D:
    case ASSET_TYPES.IMAGE:
    case ASSET_TYPES.FONT:
    case ASSET_TYPES.SVG:
    default: {
      // TODO: implement raw-webgl loader for `${asset.assetType}`.
      //       MODEL3D / ADVANCED_3D need a non-three GLTF/OBJ parser.
      //       IMAGE / SVG / FONT can use native browser APIs.
      console.warn(
        `raw-webgl loader for asset type "${asset.assetType}" not implemented`,
      );
      return null;
    }
  }
};
