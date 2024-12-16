import { FragmentEffectData, MaterialEffectProps } from "../../../../types";
import { FRAGMENT_COLOR_NAMES } from "../../../fragmentEffects.consts";
import { generateUniqueFragName } from "../../../../helpers/generateUniqueFragName";
import { physicalMaterialTransform } from "./physicalMaterialTransform";
import {
  PHYSICAL_MATERIAL_REQUIRED_FUNCTIONS,
  PHYSICAL_MATERIAL_STRUCT_CONFIG,
  PHYSICAL_MATERIAL_UNIFORM_CONFIG,
  PHYSICAL_MATERIAL_VARYING_CONFIG,
} from "./physicalMaterial.consts";

export const physicalMaterial = (
  previousFragName: string,
  effectProps: Partial<MaterialEffectProps> = {}
): FragmentEffectData => {
  const fragName = generateUniqueFragName(
    FRAGMENT_COLOR_NAMES.PHYSICAL_MATERIAL,
    effectProps.pointParent
  );

  //   const formattedProps = formatFragmentParameters(
  //     effectProps,
  //     DEFAULT_PHYSICAL_MATERIAL_EFFECT_PROPS
  //   ) as MaterialEffectProps;

  const { transform } = physicalMaterialTransform(fragName, previousFragName);
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
    fragName,
    structConfigs,
  };
};
