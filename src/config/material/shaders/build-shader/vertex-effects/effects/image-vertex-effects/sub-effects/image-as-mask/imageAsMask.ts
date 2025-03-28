import {
  AttributeConfig,
  ImageAsMaskEffectProps,
  ImageToPointsEffectProps,
  ShaderFunction,
  VaryingConfig,
} from "../../../../../types";
import { formatVertexParameters } from "../../../../../helpers/formatVertexParameters";
import { reduceFunctions } from "../../../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeUniformConfigs } from "../../../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../../../shader-properties/varyings/helpers/mergeVaryingConfigs";

import {
  DEFAULT_IMAGE_AS_MASK_EFFECT_PROPS,
  IMAGE_AS_MASK_ATTRIBUTE_CONFIG,
  IMAGE_AS_MASK_REQUIRED_FUNCTIONS,
  IMAGE_AS_MASK_UNIFORM_CONFIG,
  IMAGE_AS_MASK_VARYING_CONFIG,
} from "./imageAsMask.consts";
import { imageAsMaskTransform } from "./imageAsMaskTransform";

export const imageAsMask = (effectProps: Partial<ImageToPointsEffectProps>) => {
  const imageAsMaskEffectProps = formatVertexParameters(
    effectProps,
    DEFAULT_IMAGE_AS_MASK_EFFECT_PROPS as ImageToPointsEffectProps
  ) as unknown as ImageAsMaskEffectProps;

  const {
    transformation,
    effectUniforms,
    effectVaryings,
    effectFunctions,
    effectAttributes,
  } = imageAsMaskTransform(imageAsMaskEffectProps);

  const uniformConfig = IMAGE_AS_MASK_UNIFORM_CONFIG;
  const varyingConfig = IMAGE_AS_MASK_VARYING_CONFIG;
  const requiredFunctions: ShaderFunction[] = IMAGE_AS_MASK_REQUIRED_FUNCTIONS;
  const attributeConfig = IMAGE_AS_MASK_ATTRIBUTE_CONFIG as AttributeConfig[];

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
