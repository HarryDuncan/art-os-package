import { FRAGMENT_COLOR_NAMES } from "../../fragmentEffects.consts";
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
import { generateUniqueFragName } from "../../../helpers/generateUniqueFragName";

export const brightness = (
  previousFragName: string,
  effectProps: Partial<BrightnessFragmentEffectProps>
): FragmentEffectData => {
  const formattedEffectParams = formatFragmentParameters(
    effectProps,
    DEFAULT_BRIGHTNESS_EFFECT_PARAMS as BrightnessFragmentEffectProps
  ) as BrightnessFragmentEffectProps;
  const fragName = generateUniqueFragName(
    FRAGMENT_COLOR_NAMES.BRIGHTNESS,
    formattedEffectParams.pointParent
  );
  const uniformConfig = BRIGHTNESS_UNIFORMS;
  const varyingConfig = BRIGHTNESS_VARYINGS;
  const requiredFunctions = BRIGHTNESS_FUNCTIONS;
  const attributeConfig = BRIGHTNESS_ATTRIBUTES;
  const { fragmentColorInstantiation, transformation } = brightnessTransform(
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
