"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSceneMeshesUniform = void 0;
const getMeshesByIdentifier_1 = require("../../../../utils/scene/object-finding/getMeshesByIdentifier");
const updateSceneMeshesUniform = (scene, identifier, uniformKey, uniformValue) => {
    const meshes = (0, getMeshesByIdentifier_1.getMeshesByIdentifier)(scene, identifier);
    meshes.forEach((mesh) => {
        const material = mesh.material;
        if (material.uniforms[uniformKey]) {
            material.uniforms[uniformKey].value = uniformValue;
        }
    });
};
exports.updateSceneMeshesUniform = updateSceneMeshesUniform;
