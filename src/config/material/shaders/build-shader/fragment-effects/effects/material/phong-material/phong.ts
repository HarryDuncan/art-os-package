import {
  DEFAULT_PHONG_UNIFORMS,
  PHONG_REQUIRED_FUNCTIONS,
  PHONG_VARYINGS,
} from "./phong.consts";
import { phongTransform } from "./phongTransform";
import { mergeUniformConfigs } from "../../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import {
  FragmentEffectData,
  PhongFragmentEffectProps,
} from "../../../fragmentShader.types";

export const phongMaterial = (
  effectProps: Partial<PhongFragmentEffectProps> = {}
): FragmentEffectData => {
  const { transformation } = phongTransform();
  const uniformConfig = mergeUniformConfigs([DEFAULT_PHONG_UNIFORMS]);
  const varyingConfig = PHONG_VARYINGS;
  const requiredFunctions = PHONG_REQUIRED_FUNCTIONS;

  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig: [],
  };
};
