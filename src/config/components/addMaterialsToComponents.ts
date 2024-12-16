import { Material } from "three";
import { SceneComponentConfig } from "../config.types";
import { DEFAULT_MATERIAL } from "config/material/materials.default";

export const addMaterialsToComponents = (
  componentConfigs: SceneComponentConfig[],
  materials: Material[]
) => {
  return componentConfigs.map((componentConfig) => {
    const material = getComponentMaterial(componentConfig, materials);
    return {
      ...componentConfig,
      componentProps: {
        ...componentConfig.componentProps,
        material,
      },
    };
  });
};

const getComponentMaterial = (
  componentConfig: SceneComponentConfig,
  globalMaterials: Material[]
): Material => {
  const { materialId } = componentConfig;
  if (!materialId) {
    console.warn(
      `material not linked does not exist for ${componentConfig.id}`
    );
    return DEFAULT_MATERIAL;
  }
  const selectedMaterial = globalMaterials.find(
    (material) => String(material.name) === String(materialId)
  );
  if (selectedMaterial) {
    return selectedMaterial;
  }
  console.warn(
    `could not select material by id ${materialId} for ${componentConfig.id}`
  );
  return DEFAULT_MATERIAL;
};
