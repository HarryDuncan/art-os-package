"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialConfigToMaterial = void 0;
const getMaterial_1 = require("./getMaterial");
const materialConfigToMaterial = (materialConfig) => {
    const { materialType, materialProps, id } = materialConfig;
    const material = (0, getMaterial_1.getMaterial)(materialType, materialProps);
    material.name = id;
    return material;
};
exports.materialConfigToMaterial = materialConfigToMaterial;
