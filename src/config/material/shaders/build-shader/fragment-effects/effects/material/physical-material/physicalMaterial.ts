import { FragmentEffectData, MaterialEffectProps } from "../../../../types";
import { physicalMaterialTransform } from "./physicalMaterialTransform";
import {
  PHYSICAL_MATERIAL_REQUIRED_FUNCTIONS,
  PHYSICAL_MATERIAL_STRUCT_CONFIG,
  PHYSICAL_MATERIAL_UNIFORM_CONFIG,
  PHYSICAL_MATERIAL_VARYING_CONFIG,
} from "./physicalMaterial.consts";

export const physicalMaterial = (
  effectProps: Partial<MaterialEffectProps> = {}
): FragmentEffectData => {
  const { transform } = physicalMaterialTransform();
  const uniformConfig = PHYSICAL_MATERIAL_UNIFORM_CONFIG;
  const varyingConfig = PHYSICAL_MATERIAL_VARYING_CONFIG;
  const requiredFunctions = PHYSICAL_MATERIAL_REQUIRED_FUNCTIONS;
  const structConfigs = PHYSICAL_MATERIAL_STRUCT_CONFIG;
  return {
    requiredFunctions,
    uniformConfig,
    transformation: transform,
    varyingConfig,
    attributeConfig: [],

    structConfigs,
  };
};
