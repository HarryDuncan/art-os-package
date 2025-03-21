"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSceneData = void 0;
const formatSceneComponentConfigs_1 = require("../config/components/formatSceneComponentConfigs");
const getLightsFromConfig_1 = require("../config/lights/getLightsFromConfig");
const formatGlobalMaterials_1 = require("../config/material/formatGlobalMaterials");
const getMeshesFromConfig_1 = require("../config/mesh/getMeshesFromConfig");
const setSceneProperties_1 = require("./scene-properties/setSceneProperties");
const useThreeJsFromConfig_1 = require("./three-js/useThreeJsFromConfig");
const react_1 = require("react");
const useScreenSizeProperties_1 = require("./scene-properties/useScreenSizeProperties");
const windowStateProvider_1 = require("../compat/window-state/windowStateProvider");
const useInitializeVideos_1 = require("../assets/animated-texture/useInitializeVideos");
const useSceneData = (config, assets, areAssetsInitialized) => {
    (0, useInitializeVideos_1.useInitializeVideos)(assets, areAssetsInitialized);
    const setUpThreeJs = (0, useThreeJsFromConfig_1.useThreeJsFromConfig)();
    const { state: { screenType }, } = (0, windowStateProvider_1.useWindowState)();
    const formattedConfig = (0, useScreenSizeProperties_1.useScreenSizeProperties)(config, screenType);
    return (0, react_1.useMemo)(() => {
        var _a;
        if (!areAssetsInitialized || !formattedConfig)
            return null;
        const threeJsParams = setUpThreeJs(formattedConfig.threeJsConfig);
        const { materials, attributeConfigs } = (0, formatGlobalMaterials_1.formatGlobalMaterials)(assets, formattedConfig);
        const meshes = (0, getMeshesFromConfig_1.getMeshesFromConfig)(assets, materials, formattedConfig, attributeConfigs);
        const animationConfig = (_a = config.animationConfig) !== null && _a !== void 0 ? _a : [];
        const lights = (0, getLightsFromConfig_1.getLightsFromConfig)(formattedConfig);
        const sceneComponents = (0, formatSceneComponentConfigs_1.formatSceneComponentConfigs)(formattedConfig, materials);
        const sceneProperties = (0, setSceneProperties_1.getScenePropertiesFromConfig)(formattedConfig.scenePropertiesConfig);
        return {
            threeJsParams,
            meshes: meshes !== null && meshes !== void 0 ? meshes : [],
            sceneComponents: sceneComponents !== null && sceneComponents !== void 0 ? sceneComponents : [],
            lights: lights !== null && lights !== void 0 ? lights : [],
            sceneProperties,
            animationConfig,
        };
    }, [setUpThreeJs, formattedConfig, assets, areAssetsInitialized]);
};
exports.useSceneData = useSceneData;
