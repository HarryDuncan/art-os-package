import { Material } from "three";
import { SceneConfig } from "../../types/config.types";
import { addMaterialsToComponents } from "./addMaterialsToComponents";
import { getSceneComponents } from "./getSceneComponentsFromConfig";

export const formatSceneComponentConfigs = (
  config: SceneConfig,
  materials: Material[]
) => {
  const sceneComponentConfig = config.sceneComponentConfigs;
  if (!sceneComponentConfig) {
    return [];
  }
  const componentsWithMaterials = addMaterialsToComponents(
    sceneComponentConfig,
    materials
  );
  const components = getSceneComponents(componentsWithMaterials);
  return components;
};
