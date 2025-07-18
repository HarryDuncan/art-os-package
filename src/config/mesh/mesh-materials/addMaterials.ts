import { Material } from "three";
import {
  FormattedGeometry,
  MeshConfig,
} from "../../../assets/geometry/geometry.types";
import { MeshComponentConfig } from "../../config.types";
import { DEFAULT_MATERIAL } from "../../../consts/materials/materials.consts";

export const addMaterials = (
  formattedGeometries: FormattedGeometry[],
  materials: Material[],
  meshComponentConfigs: MeshComponentConfig[]
): MeshConfig[] => {
  return formattedGeometries.flatMap((formattedGeometry) => {
    const meshConfig = meshComponentConfigs.find(
      (config) => formattedGeometry.meshId === (config.guid ?? "")
    );
    if (!meshConfig) {
      console.warn(
        `no mesh config found for ${formattedGeometry.assetId} this mesh will not be rendered`
      );
      return [];
    }
    const material = setUpMaterial(materials, meshConfig);
    return {
      id: meshConfig.guid,
      ...formattedGeometry,
      material,
    };
  });
};

const setUpMaterial = (
  sceneMaterials: Material[],
  config?: MeshComponentConfig
): Material => {
  const { materialId, guid } = config ?? {};
  if (materialId) {
    const selectedMaterial = sceneMaterials.find(
      (material) => String(material.name) === String(materialId)
    );

    if (selectedMaterial) {
      return selectedMaterial;
    }
    console.warn(`Could not assign ${materialId} material to mesh:${guid}`);
    return DEFAULT_MATERIAL;
  }
  console.warn(`Could not assign ${materialId} material to mesh:${guid}`);
  return DEFAULT_MATERIAL;
};
