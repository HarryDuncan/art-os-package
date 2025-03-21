import { formatSceneComponentConfigs } from "../config/components/formatSceneComponentConfigs";
import { getLightsFromConfig } from "../config/lights/getLightsFromConfig";
import { formatGlobalMaterials } from "../config/material/formatGlobalMaterials";
import { getMeshesFromConfig } from "../config/mesh/getMeshesFromConfig";
import { getScenePropertiesFromConfig } from "./scene-properties/setSceneProperties";
import { useThreeJsFromConfig } from "./three-js/useThreeJsFromConfig";
import { useMemo } from "react";
import { useScreenSizeProperties } from "./scene-properties/useScreenSizeProperties";
import { useWindowState } from "../compat/window-state/windowStateProvider";
import { useInitializeVideos } from "../assets/animated-texture/useInitializeVideos";
export const useSceneData = (config, assets, areAssetsInitialized) => {
    useInitializeVideos(assets, areAssetsInitialized);
    const setUpThreeJs = useThreeJsFromConfig();
    const { state: { screenType }, } = useWindowState();
    const formattedConfig = useScreenSizeProperties(config, screenType);
    return useMemo(() => {
        var _a;
        if (!areAssetsInitialized || !formattedConfig)
            return null;
        const threeJsParams = setUpThreeJs(formattedConfig.threeJsConfig);
        const { materials, attributeConfigs } = formatGlobalMaterials(assets, formattedConfig);
        const meshes = getMeshesFromConfig(assets, materials, formattedConfig, attributeConfigs);
        const animationConfig = (_a = config.animationConfig) !== null && _a !== void 0 ? _a : [];
        const lights = getLightsFromConfig(formattedConfig);
        const sceneComponents = formatSceneComponentConfigs(formattedConfig, materials);
        const sceneProperties = getScenePropertiesFromConfig(formattedConfig.scenePropertiesConfig);
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
