"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeshesByIdentifier = void 0;
const getMeshesByIdentifier = (scene, identifier) => {
    const children = scene.children;
    const selectedMeshes = children.flatMap((child) => {
        if (child.name && child.name.indexOf(identifier) !== -1) {
            return child;
        }
        if (child.groupId && child.groupId === identifier) {
            return child;
        }
        return [];
    });
    return selectedMeshes;
};
exports.getMeshesByIdentifier = getMeshesByIdentifier;
