import { getMaterial } from "./getMaterial";
export const materialConfigToMaterial = (materialConfig) => {
    const { materialType, materialProps, id } = materialConfig;
    const material = getMaterial(materialType, materialProps);
    material.name = id;
    return material;
};
