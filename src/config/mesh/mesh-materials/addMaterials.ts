import { Material } from "three";
import {
  FormattedGeometry,
  MeshConfig,
} from "../../../assets/geometry/geometry.types";
import { MeshComponentConfig } from "../../../types/config.types";
import { DEFAULT_MATERIAL } from "../../../consts/materials.consts";

export const addMaterials = (
  formattedGeometries: FormattedGeometry[],
  materials: Material[],
  meshComponentConfigs: MeshComponentConfig[]
): MeshConfig[] => {
  return formattedGeometries.map((formattedGeometry) => {
    const meshConfig = meshComponentConfigs.find(
      (config) => formattedGeometry.assetId?.indexOf(config.assetId) !== -1
    );
    const material = setUpMaterial(materials, meshConfig);
    return {
      ...formattedGeometry,
      material,
    };
  });
};

const setUpMaterial = (
  globalMaterials: Material[],
  config?: MeshComponentConfig
): Material => {
  const { materialId, id } = config ?? {};
  if (materialId) {
    const selectedMaterial = globalMaterials.find(
      (material) => String(material.name) === String(materialId)
    );
    if (selectedMaterial) {
      return selectedMaterial;
    }
    console.warn(`Could not assign ${materialId} material to mesh:${id}`);
    return DEFAULT_MATERIAL;
  }
  console.warn(`Could not assign ${materialId} material to mesh:${id}`);
  return DEFAULT_MATERIAL;
};
