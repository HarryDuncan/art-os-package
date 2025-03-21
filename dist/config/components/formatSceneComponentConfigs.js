import { addMaterialsToComponents } from "./addMaterialsToComponents";
import { getSceneComponents } from "./getSceneComponentsFromConfig";
export const formatSceneComponentConfigs = (config, materials) => {
    const sceneComponentConfig = config.sceneComponentConfigs;
    if (!sceneComponentConfig) {
        return [];
    }
    const componentsWithMaterials = addMaterialsToComponents(sceneComponentConfig, materials);
    const components = getSceneComponents(componentsWithMaterials);
    return components;
};
