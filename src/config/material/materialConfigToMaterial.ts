import { Material } from "three";
import { MaterialConfig } from "../../types/materials.types";
import { getMaterial } from "./getMaterial";

export const materialConfigToMaterial = (materialConfig: MaterialConfig) => {
  const { materialType, materialProps, id } = materialConfig;
  const material = getMaterial(materialType, materialProps) as Material;
  material.name = id;
  return material;
};
