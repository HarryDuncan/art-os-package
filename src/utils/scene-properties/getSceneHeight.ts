import { SceneProperties } from "../../config/config.types";
import { resolveViewDimensionToPx } from "./resolveViewDimension";

export const getSceneHeight = (
  sceneProperties: SceneProperties,
  viewportHeight: number,
) => {
  return resolveViewDimensionToPx(sceneProperties?.viewHeight, viewportHeight);
};
