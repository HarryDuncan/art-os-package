import { Asset } from "../types";
import { ASSET_TYPES } from "../consts";
import { loadRawTexture } from "./loadRawTexture";

import { packageConsole } from "../../utils/packageConsole";
import { logInfo } from "../../utils/logger";

// Same element the three.js path builds in `useAssets` for ASSET_TYPES.VIDEO.
// It stays in layout: Chromium does not present frames, and so does not fire
// requestVideoFrameCallback, for a video with `display: none`. WebGL then
// never receives a frame to upload. `append-container` is where the editor
// parks these elements.
const loadRawVideo = async (asset: Asset): Promise<HTMLVideoElement> => {
  const path = asset.path ?? "";
  let video = document.getElementById(asset.guid) as HTMLVideoElement | null;

  if (!video) {
    video = document.createElement("video");
    video.id = asset.guid;
    video.crossOrigin = "anonymous";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.preload = "auto";
    video.playsInline = true;
    video.setAttribute("muted", "true");
    video.setAttribute("loop", "true");
    video.src = path;

    video.addEventListener("ended", () => {
      video!.currentTime = 0;
      video!.play().catch((error) => packageConsole.warn(error));
    });
    video.addEventListener("volumechange", () => {
      if (!video!.muted) video!.muted = true;
    });

    const appendContainer = document.getElementById("append-container");
    (appendContainer ?? document.body).appendChild(video);
    logInfo(
      "video element attached",
      { assetId: asset.guid, display: video.style.display || "(unset)" },
      "loadRawVideo",
    );
  } else if (video.src !== path) {
    video.src = path;
    video.load();
  }

  await waitForVideoToPlay(video);
  return video;
};

// Mirrors `waitForVideoToPlay` in useAssets.ts: the element is in the DOM,
// decoded far enough to upload, and play() has been requested.
const waitForVideoToPlay = async (video: HTMLVideoElement): Promise<void> => {
  if (!document.body.contains(video)) {
    await new Promise<void>((resolve) => {
      const observer = new MutationObserver(() => {
        if (document.body.contains(video)) {
          observer.disconnect();
          resolve();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  if (video.readyState < 2) {
    await new Promise<void>((resolve) => {
      const onCanPlay = () => {
        video.removeEventListener("canplay", onCanPlay);
        resolve();
      };
      video.addEventListener("canplay", onCanPlay);
    });
  }

  if (video.paused) {
    try {
      await video.play();
    } catch {
      // Muted autoplay can still be deferred until the page is considered active.
    }
  }

  if (video.paused) {
    await new Promise<void>((resolve) => {
      const onPlaying = () => {
        video.removeEventListener("playing", onPlaying);
        resolve();
      };
      video.addEventListener("playing", onPlaying);
    });
  }
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
      packageConsole.warn(
        `raw-webgl loader for asset type "${asset.assetType}" not implemented`,
      );
      return null;
    }
  }
};
