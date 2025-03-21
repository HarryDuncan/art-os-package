import { FILE_TYPES } from "../../../consts";
import { ENV_MAP_TYPES } from "../materials.consts";
import { setUpReflectionEnvMap } from "./setUpReflectionEnvMap";
export const setUpEnvMap = (imageUrl, mapType = ENV_MAP_TYPES.REFLECTION) => {
    switch (mapType) {
        case ENV_MAP_TYPES.REFLECTION:
        default:
            return setUpReflectionEnvMap(imageUrl, FILE_TYPES.IMAGES.JPG);
    }
};
