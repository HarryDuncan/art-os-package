"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMaterialsToComponents = void 0;
const materials_default_1 = require("../../config/material/materials.default");
const addMaterialsToComponents = (componentConfigs, materials) => {
    return componentConfigs.map((componentConfig) => {
        const material = getComponentMaterial(componentConfig, materials);
        return Object.assign(Object.assign({}, componentConfig), { componentProps: Object.assign(Object.assign({}, componentConfig.componentProps), { material }) });
    });
};
exports.addMaterialsToComponents = addMaterialsToComponents;
const getComponentMaterial = (componentConfig, globalMaterials) => {
    const { materialId } = componentConfig;
    if (!materialId) {
        console.warn(`material not linked does not exist for ${componentConfig.id}`);
        return materials_default_1.DEFAULT_MATERIAL;
    }
    const selectedMaterial = globalMaterials.find((material) => String(material.name) === String(materialId));
    if (selectedMaterial) {
        return selectedMaterial;
    }
    console.warn(`could not select material by id ${materialId} for ${componentConfig.id}`);
    return materials_default_1.DEFAULT_MATERIAL;
};
