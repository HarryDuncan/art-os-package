import { DEFAULT_MATERIAL } from "../../config/material/materials.default";
export const addMaterialsToComponents = (componentConfigs, materials) => {
    return componentConfigs.map((componentConfig) => {
        const material = getComponentMaterial(componentConfig, materials);
        return Object.assign(Object.assign({}, componentConfig), { componentProps: Object.assign(Object.assign({}, componentConfig.componentProps), { material }) });
    });
};
const getComponentMaterial = (componentConfig, globalMaterials) => {
    const { materialId } = componentConfig;
    if (!materialId) {
        console.warn(`material not linked does not exist for ${componentConfig.id}`);
        return DEFAULT_MATERIAL;
    }
    const selectedMaterial = globalMaterials.find((material) => String(material.name) === String(materialId));
    if (selectedMaterial) {
        return selectedMaterial;
    }
    console.warn(`could not select material by id ${materialId} for ${componentConfig.id}`);
    return DEFAULT_MATERIAL;
};
