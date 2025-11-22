import { SceneProperties } from "../../config/config.types";

export const getSceneHeight = (
  sceneProperties: SceneProperties,
  viewportHeight: number
) => {
  if (sceneProperties.viewHeight.includes("px")) {
    return parseFloat(sceneProperties.viewHeight.replace("px", ""));
  }
  return viewportHeight;
};
