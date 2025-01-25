import {
  FragmentEffectData,
  PhongFragmentEffectProps,
} from "../../../../types";
import { FRAGMENT_COLOR_NAMES } from "../../../fragmentEffects.consts";
import { generateUniqueFragName } from "../../../../helpers/generateUniqueFragName";
import {
  DEFAULT_PHONG_UNIFORMS,
  PHONG_REQUIRED_FUNCTIONS,
  PHONG_VARYINGS,
} from "./phong.consts";

import { phongTransform } from "./phongTransform";
import { mergeUniformConfigs } from "../../../../shader-properties/uniforms/helpers/mergeUniformConfigs";

export const phongMaterial = (
  previousFragName: string,
  effectProps: Partial<PhongFragmentEffectProps> = {}
): FragmentEffectData => {
  const fragName = generateUniqueFragName(
    FRAGMENT_COLOR_NAMES.MATERIAL,
    effectProps.pointParent
  );

  // const formattedProps = formatFragmentParameters(
  //   effectProps,
  //   DEFAULT_PHONG_EFFECT_PROPS
  // ) as PhongFragmentEffectProps;

  const { transformation } = phongTransform(fragName, previousFragName);
  const uniformConfig = mergeUniformConfigs([DEFAULT_PHONG_UNIFORMS]);
  const varyingConfig = PHONG_VARYINGS;
  const requiredFunctions = PHONG_REQUIRED_FUNCTIONS;

  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig: [],
    fragName,
  };
};
