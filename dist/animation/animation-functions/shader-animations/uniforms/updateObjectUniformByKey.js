"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateObjectUniformByKey = void 0;
const updateObjectUniformByKey = (mesh, uniformKey, uniformValue, uniformArrayIndex) => {
    const material = mesh.material;
    if (material && material.uniforms && material.uniforms[uniformKey]) {
        if (uniformArrayIndex !== undefined) {
            material.uniforms[uniformKey].value[uniformArrayIndex] = uniformValue;
        }
        else {
            material.uniforms[uniformKey].value = uniformValue;
        }
    }
};
exports.updateObjectUniformByKey = updateObjectUniformByKey;
