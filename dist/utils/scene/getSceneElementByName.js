"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSceneElementByName = void 0;
const animation_constants_1 = require("../../animation/animation.constants");
const getLightsByIdentifer_1 = require("./object-finding/getLightsByIdentifer");
const getMeshesByIdentifier_1 = require("./object-finding/getMeshesByIdentifier");
const getSceneElementByName = (scene, identifier) => {
    if (identifier.indexOf("light") !== -1 ||
        identifier === animation_constants_1.GENERIC_TARGET_IDENTIFIERS.LIGHTS) {
        return (0, getLightsByIdentifer_1.getLightsByIdentifier)(scene, identifier);
    }
    return (0, getMeshesByIdentifier_1.getMeshesByIdentifier)(scene, identifier);
};
exports.getSceneElementByName = getSceneElementByName;
