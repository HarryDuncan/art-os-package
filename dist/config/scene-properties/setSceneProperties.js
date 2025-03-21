import { DEFAULT_SCENE_PROPERTIES } from "../config.constants";
export const getScenePropertiesFromConfig = (config) => {
    return Object.assign(Object.assign({}, DEFAULT_SCENE_PROPERTIES), config);
};
