"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMaterials = void 0;
const materials_default_1 = require("../../../config/material/materials.default");
const addMaterials = (formattedGeometries, materials, meshComponentConfigs) => {
    return formattedGeometries.map((formattedGeometry) => {
        const meshConfig = meshComponentConfigs.find((config) => { var _a; return ((_a = formattedGeometry.name) === null || _a === void 0 ? void 0 : _a.indexOf(config.id)) !== -1; });
        const material = setUpMaterial(formattedGeometry, materials, meshConfig);
        return Object.assign(Object.assign({}, formattedGeometry), { material });
    });
};
exports.addMaterials = addMaterials;
const setUpMaterial = (formattedGeometry, globalMaterials, config) => {
    const { materialId } = config !== null && config !== void 0 ? config : {};
    if (materialId) {
        const selectedMaterial = globalMaterials.find((material) => String(material.name) === String(materialId));
        if (selectedMaterial) {
            return selectedMaterial;
        }
        console.warn(`could not select material by id ${materialId} for ${formattedGeometry.name}`);
        return materials_default_1.DEFAULT_MATERIAL;
    }
    console.warn(`material not linked for ${formattedGeometry.name}`);
    return materials_default_1.DEFAULT_MATERIAL;
};
