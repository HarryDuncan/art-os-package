import { DEFAULT_SCENE_PROPERTIES } from "../../consts";
import { ScenePropertiesConfig } from "../config.types";

export const getScenePropertiesFromConfig = (
  config?: ScenePropertiesConfig
) => {
  return {
    ...DEFAULT_SCENE_PROPERTIES,
    ...config,
  };
};
