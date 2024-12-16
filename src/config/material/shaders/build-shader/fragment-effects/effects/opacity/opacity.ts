import { FRAGMENT_COLOR_NAMES } from "../../fragmentEffects.consts";
import { FragmentEffectData, OpacityFragmentEffectProps } from "../../../types";
import {
  OPACITY_UNIFORMS,
  OPACITY_VARYINGS,
  OPACITY_FUNCTIONS,
  OPACITY_ATTRIBUTES,
  DEFAULT_OPACITY_EFFECT_PARAMS,
} from "./opacity.consts";
import { formatFragmentParameters } from "../../../helpers/formatFragmentParameters";
import { opacityTransform } from "./opacityTransform";
import { generateUniqueFragName } from "../../../helpers/generateUniqueFragName";

export const opacity = (
  previousFragName: string,
  effectProps: Partial<OpacityFragmentEffectProps>
): FragmentEffectData => {
  const formattedEffectParams = formatFragmentParameters(
    effectProps,
    DEFAULT_OPACITY_EFFECT_PARAMS
  ) as OpacityFragmentEffectProps;
  const fragName = generateUniqueFragName(
    FRAGMENT_COLOR_NAMES.OPACITY,
    formattedEffectParams.pointParent
  );
  const uniformConfig = OPACITY_UNIFORMS;
  const varyingConfig = OPACITY_VARYINGS;
  const requiredFunctions = OPACITY_FUNCTIONS;
  const attributeConfig = OPACITY_ATTRIBUTES;
  const { fragmentColorInstantiation, transformation } = opacityTransform(
    fragName,
    previousFragName,
    formattedEffectParams
  );
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig,
    fragName,
    fragmentColorInstantiation,
  };
};
