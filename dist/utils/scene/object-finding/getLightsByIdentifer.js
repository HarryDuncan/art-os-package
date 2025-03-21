import { GENERIC_TARGET_IDENTIFIERS } from "../../../animation/animation.constants";
export const getLightsByIdentifier = (scene, identifier) => {
    const selectedLights = scene.children.filter((child) => child.isLight &&
        !child.isAmbientLight &&
        (identifier === GENERIC_TARGET_IDENTIFIERS.LIGHTS ||
            child.name.indexOf(identifier) !== -1));
    return selectedLights;
};
