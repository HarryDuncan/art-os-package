import { DEFAULT_SCENE_PROPERTIES } from "../config.constants";
import { ScenePropertiesConfig } from "../config.types";

export const getScenePropertiesFromConfig = (
  config?: ScenePropertiesConfig
) => {
  return {
    ...DEFAULT_SCENE_PROPERTIES,
    ...config,
  };
};
