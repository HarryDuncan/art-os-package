import { FRAGMENT_COLOR_NAMES } from "../../fragmentEffects.consts";
import { colorTransformation } from "./colorTransformation";
import { ColorFragmentEffectProps, FragmentEffectData } from "../../../types";
import {
  DEFAULT_COLOR_EFFECT_PROPS,
  DEFAULT_COLOR_FUNCTIONS,
  DEFAULT_COLOR_UNIFORMS,
  DEFAULT_COLOR_VARYINGS,
} from "./color.consts";
import { formatFragmentParameters } from "../../../helpers/formatFragmentParameters";

export const color = (
  _previousFragName: string,
  effectProps: Partial<ColorFragmentEffectProps>
): FragmentEffectData => {
  const formattedEffectProps = formatFragmentParameters(
    effectProps,
    DEFAULT_COLOR_EFFECT_PROPS
  ) as ColorFragmentEffectProps;
  const fragName = FRAGMENT_COLOR_NAMES.COLOR;
  const uniformConfig = DEFAULT_COLOR_UNIFORMS;
  const varyingConfig = DEFAULT_COLOR_VARYINGS;
  const requiredFunctions = DEFAULT_COLOR_FUNCTIONS;

  const transformation = colorTransformation(fragName, formattedEffectProps);

  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig: [],
    fragName,
  };
};
