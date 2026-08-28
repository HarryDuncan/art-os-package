import { Material, MeshPhongMaterial } from "three";
import {
  FormattedGeometry,
  MeshConfig,
} from "../../../assets/geometry/geometry.types";
import { MeshComponentConfig } from "../../config.types";

import { packageConsole } from "../../../utils/packageConsole";
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
      packageConsole.warn(
        `no mesh config found for ${formattedGeometry.assetId} this mesh will not be rendered`
      );
      return [];
    }
    const material = setUpMaterial(materials, meshConfig);
    return {
      id: meshConfig.guid,
      name: meshConfig.name ?? meshConfig.guid,
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
    packageConsole.warn(`Could not assign ${materialId} material to mesh:${guid}`);
    return new MeshPhongMaterial({
      specular: 0x111111,
      shininess: 250,
    });
  }
  packageConsole.warn(`Could not assign ${materialId} material to mesh:${guid}`);
  return new MeshPhongMaterial({
    specular: 0x111111,
    shininess: 250,
  });
};
