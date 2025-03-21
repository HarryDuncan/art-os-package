import {
  AttributeConfig,
  NoiseTransitionProps,
  ShaderFunction,
  VaryingConfig,
} from "../../../../../types";
import { formatVertexParameters } from "../../../../../helpers/formatVertexParameters";
import { reduceFunctions } from "../../../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeUniformConfigs } from "../../../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import {
  DEFAULT_NOISE_TRANSITION_EFFECT_PROPS,
  NOISE_TRANSITION_ATTRIBUTE_CONFIG,
  NOISE_TRANSITION_REQUIRED_FUNCTIONS,
  NOISE_TRANSITION_UNIFORM_CONFIG,
  NOISE_TRANSITION_VARYING_CONFIG,
} from "./noiseTranstion.consts";
import { noiseTransitionTransform } from "./noiseTransitionTransform";

export const noiseTransition = (effectProps: Partial<NoiseTransitionProps>) => {
  const noiseTransitionEffectProps = formatVertexParameters(
    effectProps,
    DEFAULT_NOISE_TRANSITION_EFFECT_PROPS
  ) as unknown as NoiseTransitionProps;

  const {
    transformation,
    effectUniforms,
    effectVaryings,
    effectFunctions,
    effectAttributes,
  } = noiseTransitionTransform(noiseTransitionEffectProps);

  const uniformConfig = NOISE_TRANSITION_UNIFORM_CONFIG;
  const varyingConfig = NOISE_TRANSITION_VARYING_CONFIG;
  const requiredFunctions: ShaderFunction[] =
    NOISE_TRANSITION_REQUIRED_FUNCTIONS;
  const attributeConfig =
    NOISE_TRANSITION_ATTRIBUTE_CONFIG as AttributeConfig[];

  const mergedUniformConfigs = mergeUniformConfigs([
    effectUniforms,
    uniformConfig,
  ]);
  const mergedVaryingConfigs = mergeVaryingConfigs([
    effectVaryings as VaryingConfig[],
    varyingConfig,
  ]);
  const mergedRequiredFunction = reduceFunctions([
    effectFunctions,
    requiredFunctions,
  ]);
  const mergedAttributeConfigs = mergeAttributeConfigs([
    attributeConfig,
    effectAttributes,
  ]);

  return {
    requiredFunctions: mergedRequiredFunction,
    uniformConfig: mergedUniformConfigs,
    attributeConfig: mergedAttributeConfigs,
    transformation,
    varyingConfig: mergedVaryingConfigs,
  };
};
