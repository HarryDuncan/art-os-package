import { SceneProperties } from "../../config/config.types";

export const getSceneWidth = (
  sceneProperties: SceneProperties,
  viewportWidth: number
) => {
  if (sceneProperties?.viewWidth?.includes("px")) {
    return parseFloat(sceneProperties.viewWidth.replace("px", ""));
  }
  return viewportWidth;
};
