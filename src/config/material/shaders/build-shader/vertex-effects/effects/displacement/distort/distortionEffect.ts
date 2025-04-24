import { VertexEffectData } from "../../../vertexEffects.types";
import { distortionTransform } from "./distortionTransform";
import {
  DEFAULT_DISTORT_FUNCTIONS,
  DEFAULT_DISTORT_UNIFORMS,
  DEFAULT_DISTORT_VARYINGS,
  DEFAULT_DISTORTION_EFFECT_PARAMETERS,
} from "./distortion.defaults";
import { formatVertexParameters } from "../../../../helpers/formatVertexParameters";
import { mergeUniformConfigs } from "../../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { reduceFunctions } from "../../../../helpers/reduceFunctions";
import { DistortionEffectProps } from "../../../../../../../../types/materials/shaders/vertexShader.types";

export const distortionEffect = (
  effectProps: Partial<DistortionEffectProps>
): VertexEffectData => {
  const distortionEffectParameters = formatVertexParameters(
    effectProps,
    DEFAULT_DISTORTION_EFFECT_PARAMETERS
  ) as unknown as DistortionEffectProps;

  const {
    transformation,

    uniformConfig: effectUniformConfig,
    requiredFunctions: effectFunctions,
  } = distortionTransform(distortionEffectParameters);
  const requiredFunctions = reduceFunctions([
    DEFAULT_DISTORT_FUNCTIONS,
    effectFunctions,
  ]);

  const uniformConfig = mergeUniformConfigs([
    DEFAULT_DISTORT_UNIFORMS,
    effectUniformConfig,
  ]);
  const varyingConfig = DEFAULT_DISTORT_VARYINGS;

  return {
    attributeConfig: [],
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
  };
};
