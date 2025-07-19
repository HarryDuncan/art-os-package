import { Material, MeshPhongMaterial } from "three";
import { SceneComponentConfig } from "../config.types";

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
  sceneMaterials: Material[]
): Material => {
  const { materialId } = componentConfig;
  if (!materialId) {
    console.warn(
      `material not linked does not exist for ${componentConfig.id}`
    );
    return new MeshPhongMaterial({
      specular: 0x111111,
      shininess: 250,
    });
  }
  const selectedMaterial = sceneMaterials.find(
    (material) => String(material.name) === String(materialId)
  );
  if (selectedMaterial) {
    return selectedMaterial;
  }
  console.warn(
    `could not select material by id ${materialId} for ${componentConfig.id}`
  );
  return new MeshPhongMaterial({
    specular: 0x111111,
    shininess: 250,
  });
};
