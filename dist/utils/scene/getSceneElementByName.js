import { GENERIC_TARGET_IDENTIFIERS } from "../../animation/animation.constants";
import { getLightsByIdentifier } from "./object-finding/getLightsByIdentifer";
import { getMeshesByIdentifier } from "./object-finding/getMeshesByIdentifier";
export const getSceneElementByName = (scene, identifier) => {
    if (identifier.indexOf("light") !== -1 ||
        identifier === GENERIC_TARGET_IDENTIFIERS.LIGHTS) {
        return getLightsByIdentifier(scene, identifier);
    }
    return getMeshesByIdentifier(scene, identifier);
};
