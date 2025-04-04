import {
  FragmentEffectData,
  BrightnessFragmentEffectProps,
} from "../../../types";
import {
  BRIGHTNESS_UNIFORMS,
  BRIGHTNESS_VARYINGS,
  BRIGHTNESS_FUNCTIONS,
  BRIGHTNESS_ATTRIBUTES,
  DEFAULT_BRIGHTNESS_EFFECT_PARAMS,
} from "./brightness.consts";
import { formatFragmentParameters } from "../../../helpers/formatFragmentParameters";
import { brightnessTransform } from "./brightnessTransform";

export const brightness = (
  effectProps: Partial<BrightnessFragmentEffectProps>
): FragmentEffectData => {
  const formattedEffectParams = formatFragmentParameters(
    effectProps,
    DEFAULT_BRIGHTNESS_EFFECT_PARAMS as BrightnessFragmentEffectProps
  ) as BrightnessFragmentEffectProps;

  const uniformConfig = BRIGHTNESS_UNIFORMS;
  const varyingConfig = BRIGHTNESS_VARYINGS;
  const requiredFunctions = BRIGHTNESS_FUNCTIONS;
  const attributeConfig = BRIGHTNESS_ATTRIBUTES;
  const { transformation } = brightnessTransform(formattedEffectParams);
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig,
  };
};
