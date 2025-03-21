"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScenePropertiesFromConfig = void 0;
const config_constants_1 = require("../config.constants");
const getScenePropertiesFromConfig = (config) => {
    return Object.assign(Object.assign({}, config_constants_1.DEFAULT_SCENE_PROPERTIES), config);
};
exports.getScenePropertiesFromConfig = getScenePropertiesFromConfig;
