import { CSSProperties } from "react";
import {
  FormattedSceneProperties,
  ResolvedSceneBackground,
} from "../../../config/config.types";

const getBackgroundStyles = (
  background: ResolvedSceneBackground,
): Pick<CSSProperties, "backgroundColor" | "backgroundImage"> => {
  return {
    backgroundColor: background.color,
    backgroundImage: "none",
  };
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
