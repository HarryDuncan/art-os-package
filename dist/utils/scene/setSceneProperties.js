export const setSceneProperties = (sceneProperties, scene) => {
    var _a, _b;
    if (!sceneProperties)
        return;
    if (sceneProperties.background !== null) {
        // @ts-ignore
        scene.background = (_a = sceneProperties === null || sceneProperties === void 0 ? void 0 : sceneProperties.background) !== null && _a !== void 0 ? _a : null;
    }
    const sceneId = (_b = sceneProperties.sceneId) !== null && _b !== void 0 ? _b : "";
    scene.guid = sceneId;
};
