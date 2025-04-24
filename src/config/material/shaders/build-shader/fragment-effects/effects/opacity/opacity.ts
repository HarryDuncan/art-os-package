import {
  OPACITY_UNIFORMS,
  OPACITY_VARYINGS,
  OPACITY_FUNCTIONS,
  OPACITY_ATTRIBUTES,
  DEFAULT_OPACITY_EFFECT_PARAMS,
} from "./opacity.consts";
import { formatFragmentParameters } from "../../../helpers/formatFragmentParameters";
import { opacityTransform } from "./opacityTransform";
import {
  FragmentEffectData,
  OpacityFragmentEffectProps,
} from "../../../../../../../types/materials/shaders/fragmentShader.types";

export const opacity = (
  effectProps: Partial<OpacityFragmentEffectProps>
): FragmentEffectData => {
  const formattedEffectParams = formatFragmentParameters(
    effectProps,
    DEFAULT_OPACITY_EFFECT_PARAMS
  ) as OpacityFragmentEffectProps;

  const uniformConfig = OPACITY_UNIFORMS;
  const varyingConfig = OPACITY_VARYINGS;
  const requiredFunctions = OPACITY_FUNCTIONS;
  const attributeConfig = OPACITY_ATTRIBUTES;
  const { transformation } = opacityTransform(formattedEffectParams);
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig,
  };
};
