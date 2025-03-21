"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneConfigType = exports.DEFAULT_SCENE_PROPERTIES = exports.DEFAULT_CONFIG = void 0;
exports.DEFAULT_CONFIG = {
    threeJsConfig: {},
    assets: [],
    meshComponentConfigs: [],
    globalMaterialConfigs: [],
    animationConfig: [],
    lightConfig: [],
    sceneComponentConfigs: [],
    interactionConfig: [],
    scenePropertiesConfig: {},
};
exports.DEFAULT_SCENE_PROPERTIES = {
    viewWidth: "100vw",
    viewHeight: "100vh",
    backgroundColor: "white",
    backgroundUrl: "",
    position: "fixed",
};
var SceneConfigType;
(function (SceneConfigType) {
    SceneConfigType["Master"] = "Master";
})(SceneConfigType = exports.SceneConfigType || (exports.SceneConfigType = {}));
