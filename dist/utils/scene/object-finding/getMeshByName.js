"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeshByName = void 0;
const getMeshByName = (scene, meshName) => {
    var _a;
    const selectedMesh = scene.children.find((child) => child.name === meshName);
    return (_a = selectedMesh) !== null && _a !== void 0 ? _a : null;
};
exports.getMeshByName = getMeshByName;
