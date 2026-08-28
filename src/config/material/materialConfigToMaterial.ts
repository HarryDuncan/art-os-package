import { Material } from "three";
import { MaterialConfig } from "./types";
import { getMaterial } from "./getMaterial";

export const materialConfigToMaterial = (materialConfig: MaterialConfig) => {
  const { materialType, materialProps, guid, name } = materialConfig;
  const material = getMaterial(materialType, materialProps) as Material;
  material.name = guid;
  material.userData.configName = name;
  return material;
};
