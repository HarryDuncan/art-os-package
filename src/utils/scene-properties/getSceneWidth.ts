import { SceneProperties } from "../../config/config.types";
import { resolveViewDimensionToPx } from "./resolveViewDimension";

export const getSceneWidth = (
  sceneProperties: SceneProperties,
  viewportWidth: number,
) => {
  return resolveViewDimensionToPx(sceneProperties?.viewWidth, viewportWidth);
};
