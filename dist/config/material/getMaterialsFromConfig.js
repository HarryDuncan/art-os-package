import { materialConfigToMaterial } from "./materialConfigToMaterial";
import { ASSET_MAPPED_MATERIALS, SHADER_MATERIALS } from "./materials.consts";
export const getMaterialsFromConfig = (config) => {
    const { globalMaterialConfigs } = config;
    if (globalMaterialConfigs) {
        return globalMaterialConfigs.flatMap((materialConfig) => {
            return !SHADER_MATERIALS.includes(materialConfig.materialType) &&
                !ASSET_MAPPED_MATERIALS.includes(materialConfig.materialType)
                ? materialConfigToMaterial(materialConfig)
                : [];
        });
    }
    return [];
};
