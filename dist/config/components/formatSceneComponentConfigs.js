"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSceneComponentConfigs = void 0;
const addMaterialsToComponents_1 = require("./addMaterialsToComponents");
const getSceneComponentsFromConfig_1 = require("./getSceneComponentsFromConfig");
const formatSceneComponentConfigs = (config, materials) => {
    const sceneComponentConfig = config.sceneComponentConfigs;
    if (!sceneComponentConfig) {
        return [];
    }
    const componentsWithMaterials = (0, addMaterialsToComponents_1.addMaterialsToComponents)(sceneComponentConfig, materials);
    const components = (0, getSceneComponentsFromConfig_1.getSceneComponents)(componentsWithMaterials);
    return components;
};
exports.formatSceneComponentConfigs = formatSceneComponentConfigs;
