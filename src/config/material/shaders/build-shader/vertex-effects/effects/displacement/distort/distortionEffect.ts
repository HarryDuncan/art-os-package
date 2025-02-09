import { VERTEX_EFFECT_POINT_NAMES } from "../../../vertexEffects.consts";
import { VertexEffectData } from "../../../vertexEffects.types";
import { distortionTransform } from "./distortionTransform";
import {
  DEFAULT_DISTORT_FUNCTIONS,
  DEFAULT_DISTORT_UNIFORMS,
  DEFAULT_DISTORT_VARYINGS,
  DEFAULT_DISTORTION_EFFECT_PARAMETERS,
} from "./distortion.defaults";
import { DistortionEffectProps } from "../../../../types/vertexShader.types";
import { formatVertexParameters } from "../../../../helpers/formatVertexParameters";
import { generateUniquePointName } from "../../../../helpers/generateUniquePointName";
import { mergeUniformConfigs } from "../../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { reduceFunctions } from "../../../../helpers/reduceFunctions";

export const distortionEffect = (
  effectProps: Partial<DistortionEffectProps>
): VertexEffectData => {
  const distortionEffectParameters = formatVertexParameters(
    effectProps,
    DEFAULT_DISTORTION_EFFECT_PARAMETERS
  ) as DistortionEffectProps;

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
