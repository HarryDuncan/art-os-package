import { colorTransformation } from "./colorTransformation";
import {
  DEFAULT_COLOR_FUNCTIONS,
  DEFAULT_COLOR_UNIFORMS,
  DEFAULT_COLOR_VARYINGS,
} from "./color.consts";
import {
  FragmentEffectData,
  FragmentEffectProps,
} from "../../fragmentShader.types";

export const color = (effectProps: FragmentEffectProps): FragmentEffectData => {
  const { effectUniforms } = effectProps;
  const uniformConfig = DEFAULT_COLOR_UNIFORMS;
  const varyingConfig = DEFAULT_COLOR_VARYINGS;
  const requiredFunctions = DEFAULT_COLOR_FUNCTIONS;

  const transformation = colorTransformation(effectUniforms);

  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig: [],
  };
};
