"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLightsByIdentifier = void 0;
const animation_constants_1 = require("../../../animation/animation.constants");
const getLightsByIdentifier = (scene, identifier) => {
    const selectedLights = scene.children.filter((child) => child.isLight &&
        !child.isAmbientLight &&
        (identifier === animation_constants_1.GENERIC_TARGET_IDENTIFIERS.LIGHTS ||
            child.name.indexOf(identifier) !== -1));
    return selectedLights;
};
exports.getLightsByIdentifier = getLightsByIdentifier;
