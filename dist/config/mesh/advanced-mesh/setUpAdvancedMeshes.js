"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpAdvancedMeshes = void 0;
const formatFromConfig_1 = require("../../../utils/three-dimension-space/formatFromConfig");
const SkeletonUtils_1 = require("three/examples/jsm/utils/SkeletonUtils");
const setUpAdvancedMeshes = (assets, meshConfigs = [], materials = [], meshTransforms = [], attributeConfigs = []) => meshConfigs.flatMap((meshConfig) => {
    const selectedAsset = assets.find((asset) => asset.id === meshConfig.assetId);
    if (selectedAsset) {
        const { data } = selectedAsset;
        const { scene, animations } = data;
        // format any geometry data to mesh config while still being part of group
        const formattedScene = formatScene(scene, meshConfig);
        formattedScene.animations = animations;
        loopThroughAllChildren(formattedScene, materials, meshTransforms, attributeConfigs, [meshConfig]);
        formattedScene.name = meshConfig.id;
        return formattedScene;
    }
    return [];
});
exports.setUpAdvancedMeshes = setUpAdvancedMeshes;
const loopThroughAllChildren = (data, materials, meshTransforms, attributeConfigs, meshComponentConfigs) => {
    const { children } = data;
    children.forEach((child) => {
        const { idGroup, isMesh } = child;
        if (idGroup || child.children.length > 0) {
            loopThroughAllChildren(child, materials, meshTransforms, attributeConfigs, meshComponentConfigs);
        }
        if (isMesh) {
            // // add any material data to mesh
            // const formattedTransforms = formatMeshAttributes(
            //   meshTransforms ?? [],
            //   attributeConfigs as unknown as ShaderAttributeConfig[]
            // );
            // const shaderMaterial = materials[0];
            // child.material = shaderMaterial;
            // // return group
        }
    });
};
const formatScene = (scene, meshConfig) => {
    var _a;
    const clonedScene = (0, SkeletonUtils_1.clone)(scene);
    const position = (0, formatFromConfig_1.formatPositionFromConfig)(meshConfig);
    const rotation = (0, formatFromConfig_1.formatRotationFromConfig)(meshConfig);
    clonedScene.position.set(position.x, position.y, position.z);
    clonedScene.rotation.set(rotation.x, rotation.y, rotation.z);
    const scale = ((_a = meshConfig.geometryConfig) === null || _a === void 0 ? void 0 : _a.scale) || 1;
    clonedScene.scale.set(scale, scale, scale);
    return clonedScene;
};
