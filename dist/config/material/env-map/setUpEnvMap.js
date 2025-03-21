"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpEnvMap = void 0;
const consts_1 = require("../../../consts");
const materials_consts_1 = require("../materials.consts");
const setUpReflectionEnvMap_1 = require("./setUpReflectionEnvMap");
const setUpEnvMap = (imageUrl, mapType = materials_consts_1.ENV_MAP_TYPES.REFLECTION) => {
    switch (mapType) {
        case materials_consts_1.ENV_MAP_TYPES.REFLECTION:
        default:
            return (0, setUpReflectionEnvMap_1.setUpReflectionEnvMap)(imageUrl, consts_1.FILE_TYPES.IMAGES.JPG);
    }
};
exports.setUpEnvMap = setUpEnvMap;
