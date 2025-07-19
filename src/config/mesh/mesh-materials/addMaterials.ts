import { Material, MeshPhongMaterial } from "three";
import {
  FormattedGeometry,
  MeshConfig,
} from "../../../assets/geometry/geometry.types";
import { MeshComponentConfig } from "../../config.types";

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
    return new MeshPhongMaterial({
      specular: 0x111111,
      shininess: 250,
    });
  }
  console.warn(`Could not assign ${materialId} material to mesh:${guid}`);
  return new MeshPhongMaterial({
    specular: 0x111111,
    shininess: 250,
  });
};
