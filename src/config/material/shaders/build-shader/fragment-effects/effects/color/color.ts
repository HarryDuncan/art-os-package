import { colorTransformation } from "./colorTransformation";
import {
  DEFAULT_COLOR_FUNCTIONS,
  DEFAULT_COLOR_UNIFORMS,
  DEFAULT_COLOR_VARYINGS,
} from "./color.consts";

import {
  ColorFragmentEffectProps,
  FragmentEffectData,
} from "../../fragmentShader.types";
import { UniformValueConfig } from "../../../buildShader.types";

export const color = (
  configuredUniforms: UniformValueConfig[],
  effectProps: Partial<ColorFragmentEffectProps>
): FragmentEffectData => {
  const uniformConfig = DEFAULT_COLOR_UNIFORMS;
  const varyingConfig = DEFAULT_COLOR_VARYINGS;
  const requiredFunctions = DEFAULT_COLOR_FUNCTIONS;

  const transformation = colorTransformation(configuredUniforms);

  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig: [],
  };
};
