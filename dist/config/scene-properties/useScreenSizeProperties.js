import { useMemo } from "react";
export const useScreenSizeProperties = (config, currentScreenType) => useMemo(() => {
    if (!config || currentScreenType === "DESKTOP") {
        return config;
    }
    const { screenSizeAdjustments } = config;
    if (!screenSizeAdjustments || !screenSizeAdjustments.length) {
        return config;
    }
    const currentAdjustment = screenSizeAdjustments.find(({ screenType }) => screenType === currentScreenType);
    if (!currentAdjustment) {
        return config;
    }
    const threeJsConfig = mergeThreeJsConfig(config.threeJsConfig, currentAdjustment === null || currentAdjustment === void 0 ? void 0 : currentAdjustment.threeJsConfig);
    const meshComponentConfigs = mergeMeshConfigs(config.meshComponentConfigs, currentAdjustment.meshComponentConfigs);
    const updatedConfig = Object.assign(Object.assign({}, config), { meshComponentConfigs,
        threeJsConfig });
    return updatedConfig;
}, [config, currentScreenType]);
const mergeThreeJsConfig = (currentConfig, adjustedConfig) => {
    if (!adjustedConfig)
        return currentConfig;
    return Object.assign(Object.assign({}, currentConfig), adjustedConfig);
};
const mergeMeshConfigs = (currentMeshConfigs = [], meshesToMerge = []) => {
    const currentMeshConfigMap = new Map();
    currentMeshConfigs.forEach((meshConfig) => {
        currentMeshConfigMap.set(meshConfig.id, meshConfig);
    });
    const mergedMeshConfigs = [];
    meshesToMerge.forEach((meshToMerge) => {
        var _a;
        const currentMeshConfig = currentMeshConfigMap.get((_a = meshToMerge.id) !== null && _a !== void 0 ? _a : "");
        if (currentMeshConfig) {
            const mergedMeshConfig = Object.assign(Object.assign(Object.assign({}, currentMeshConfig), meshToMerge), { rotation: Object.assign(Object.assign({}, (currentMeshConfig.rotation || {})), (meshToMerge.rotation || {})), position: Object.assign(Object.assign({}, (currentMeshConfig.position || {})), (meshToMerge.position || {})), geometryConfig: Object.assign(Object.assign({}, (currentMeshConfig.geometryConfig || {})), (meshToMerge.geometryConfig || {})) });
            mergedMeshConfigs.push(mergedMeshConfig);
        }
        else {
            mergedMeshConfigs.push(meshToMerge);
        }
    });
    const mergedMeshConfigMap = new Map();
    mergedMeshConfigs.forEach((meshConfig) => {
        mergedMeshConfigMap.set(meshConfig.id, meshConfig);
    });
    currentMeshConfigs.forEach((currentMeshConfig) => {
        if (!mergedMeshConfigMap.has(currentMeshConfig.id)) {
            mergedMeshConfigs.push(currentMeshConfig);
        }
    });
    return mergedMeshConfigs;
};
