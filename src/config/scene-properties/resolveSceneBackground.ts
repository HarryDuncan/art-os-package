import { Asset } from "../../assets/types";
import {
  ResolvedSceneBackground,
  SceneBackground,
  SceneBackgroundAsset,
} from "../config.types";

export const resolveSceneBackground = (
  background: SceneBackground | undefined,
  assets: Asset[],
): ResolvedSceneBackground => {
  if (!background) {
    return { type: "color", color: "white" };
  }

  if (background.type !== "asset") {
    return background;
  }

  const asset = assets.find(
    (entry) => entry.guid === (background as SceneBackgroundAsset).assetGuid,
  );

  if (!asset?.path) {
    return { type: "color", color: "transparent" };
  }

  return {
    type: "asset",
    assetType: asset.assetType,
    url: asset.path,
  };
};
