/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { colorTransformation } from "../color/colorTransformation";
import {
  DEFAULT_HUE_SHIFT_FUNCTIONS,
  DEFAULT_HUE_SHIFT_UNIFORMS,
  DEFAULT_HUE_SHIFT_VARYINGS,
} from "./hueShift.consts";

export const hueShift = (effectProps) => {
  const uniformConfig = DEFAULT_HUE_SHIFT_UNIFORMS;
  const varyingConfig = DEFAULT_HUE_SHIFT_VARYINGS;
  const requiredFunctions = DEFAULT_HUE_SHIFT_FUNCTIONS;

  const transformation = colorTransformation(effectProps);

  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig: [],
  };
};
