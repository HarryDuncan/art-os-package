import { ResolvedSceneBackground } from "../config.types";

export const hasResolvedSceneBackground = (
  background: ResolvedSceneBackground | undefined,
): boolean => {
  if (!background) return false;

  switch (background.type) {
    case "asset":
      return Boolean(background.url);
    case "gradient":
      return true;
    case "color":
      return Boolean(background.color);
    default:
      return false;
  }
};

export const isAssetSceneBackground = (
  background: ResolvedSceneBackground | undefined,
): boolean => background?.type === "asset" && Boolean(background.url);
