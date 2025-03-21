import { getMaterialsFromConfig } from "./getMaterialsFromConfig";
import { getShaderMaterials } from "./shaders/getShaderMaterials";
import { getAssetMappedMaterials } from "./getAssetMappedMaterials";
import { getBuiltShaderMaterials } from "./shaders/getBuiltShaderMaterials";
export const formatGlobalMaterials = (assets, config) => {
    var _a;
    const assetMappedMaterials = getAssetMappedMaterials((_a = config === null || config === void 0 ? void 0 : config.globalMaterialConfigs) !== null && _a !== void 0 ? _a : [], assets);
    const shaderMaterials = getShaderMaterials(config, assets);
    const { builtShaders, attributeConfigs } = getBuiltShaderMaterials(config, assets);
    const globalMaterials = getMaterialsFromConfig(config);
    return {
        materials: [
            ...assetMappedMaterials,
            ...shaderMaterials,
            ...(builtShaders !== null && builtShaders !== void 0 ? builtShaders : []),
            ...globalMaterials,
        ],
        attributeConfigs,
    };
};
