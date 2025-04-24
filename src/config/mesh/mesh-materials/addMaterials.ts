import { Material } from "three";
import {
  FormattedGeometry,
  MeshConfig,
} from "../../../assets/geometry/geometry.types";
import { MeshComponentConfig } from "../../../types/config.types";
import { DEFAULT_MATERIAL } from "../../../consts/materials/materials.consts";

export const addMaterials = (
  formattedGeometries: FormattedGeometry[],
  materials: Material[],
  meshComponentConfigs: MeshComponentConfig[]
): MeshConfig[] => {
  return formattedGeometries.flatMap((formattedGeometry) => {
    const meshConfig = meshComponentConfigs.find(
      (config) => formattedGeometry.meshId === (config.id ?? "")
    );
    if (!meshConfig) {
      console.warn(
        `no mesh config found for ${formattedGeometry.assetId} this mesh will not be rendered`
      );
      return [];
    }
    const material = setUpMaterial(materials, meshConfig);
    return {
      id: meshConfig.id,
      ...formattedGeometry,
      material,
    };
  });
};

const setUpMaterial = (
  sceneMaterials: Material[],
  config?: MeshComponentConfig
): Material => {
  const { materialId, id } = config ?? {};
  if (materialId) {
    const selectedMaterial = sceneMaterials.find(
      (material) => String(material.name) === String(materialId)
    );
    console.log(sceneMaterials);
    console.log(selectedMaterial);
    if (selectedMaterial) {
      return selectedMaterial;
    }
    console.warn(`Could not assign ${materialId} material to mesh:${id}`);
    return DEFAULT_MATERIAL;
  }
  console.warn(`Could not assign ${materialId} material to mesh:${id}`);
  return DEFAULT_MATERIAL;
};
