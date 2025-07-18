import { useMemo } from "react";
import { Asset } from "../types";
import { ASSET_TYPES } from "../consts";
import { setupVideo } from "./setUpVideo";

export const useInitializeVideos = (
  loadedAssets: Asset[],
  isInitialized = true
) => {
  const videoAssets = useMemo(
    () =>
      loadedAssets.flatMap((asset) =>
        asset.assetType === ASSET_TYPES.VIDEO ? asset : []
      ),
    [loadedAssets]
  );
  if (isInitialized) {
    videoAssets.forEach(({ path, name }) => {
      setupVideo(path ?? "", name ?? "");
    });
  }
};
