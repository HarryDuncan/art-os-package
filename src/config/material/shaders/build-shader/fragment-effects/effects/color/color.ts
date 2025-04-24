import { colorTransformation } from "./colorTransformation";
import {
  DEFAULT_FRAG_COLOR_PROPS,
  DEFAULT_COLOR_FUNCTIONS,
  DEFAULT_COLOR_UNIFORMS,
  DEFAULT_COLOR_VARYINGS,
} from "./color.consts";
import { formatFragmentParameters } from "../../../helpers/formatFragmentParameters";
import {
  ColorFragmentEffectProps,
  FragmentEffectData,
} from "../../../../../../../types/materials/shaders/fragmentShader.types";

export const color = (
  effectProps: Partial<ColorFragmentEffectProps>
): FragmentEffectData => {
  const formattedEffectProps = formatFragmentParameters(
    effectProps,
    DEFAULT_FRAG_COLOR_PROPS
  ) as ColorFragmentEffectProps;

  const uniformConfig = DEFAULT_COLOR_UNIFORMS;
  const varyingConfig = DEFAULT_COLOR_VARYINGS;
  const requiredFunctions = DEFAULT_COLOR_FUNCTIONS;

  const transformation = colorTransformation(formattedEffectProps);

  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig: [],
  };
};
