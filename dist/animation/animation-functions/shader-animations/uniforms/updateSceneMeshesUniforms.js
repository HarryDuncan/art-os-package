import { getMeshesByIdentifier } from "../../../../utils/scene/object-finding/getMeshesByIdentifier";
export const updateSceneMeshesUniform = (scene, identifier, uniformKey, uniformValue) => {
    const meshes = getMeshesByIdentifier(scene, identifier);
    meshes.forEach((mesh) => {
        const material = mesh.material;
        if (material.uniforms[uniformKey]) {
            material.uniforms[uniformKey].value = uniformValue;
        }
    });
};
