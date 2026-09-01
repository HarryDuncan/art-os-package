import { CSSProperties } from "react";
import {
  FormattedSceneProperties,
  ResolvedSceneBackground,
} from "../../../config/config.types";
import { ASSET_TYPES } from "../../../assets/consts";

const getBackgroundStyles = (
  background: ResolvedSceneBackground,
): Pick<CSSProperties, "backgroundColor" | "backgroundImage" | "backgroundSize"> => {
  switch (background.type) {
    case "color":
      return {
        backgroundColor: background.color,
        backgroundImage: "none",
      };
    case "gradient": {
      const angle = background.angle ?? 180;
      return {
        backgroundColor: "transparent",
        backgroundImage: `linear-gradient(${angle}deg, ${background.startColor}, ${background.endColor})`,
        backgroundSize: "cover",
      };
    }
    case "asset":
      if (background.assetType === ASSET_TYPES.VIDEO) {
        return {
          backgroundColor: "transparent",
          backgroundImage: "none",
        };
      }
      return {
        backgroundColor: "transparent",
        backgroundImage: `url(${background.url})`,
        backgroundSize: "cover",
      };
    default:
      return {
        backgroundColor: "transparent",
        backgroundImage: "none",
      };
  }
};

export const getVideoBackgroundUrl = (
  background: ResolvedSceneBackground | undefined,
): string | undefined => {
  if (background?.type !== "asset") return undefined;
  if (background.assetType !== ASSET_TYPES.VIDEO) return undefined;
  return background.url;
};

export const getRootContainerStyles = (
  sceneProperties: FormattedSceneProperties,
): CSSProperties => {
  const backgroundStyles = getBackgroundStyles(sceneProperties.background);

  return {
    height: sceneProperties.viewHeight,
    width: sceneProperties.viewWidth,
    overflow: "hidden",
    margin: "0 auto",
    cursor: sceneProperties.cursor ?? "pointer",
    position: sceneProperties.position as
      | "relative"
      | "absolute"
      | "fixed"
      | "sticky"
      | undefined,
    zIndex: sceneProperties.zIndex ?? 0,
    ...backgroundStyles,
  };
};
