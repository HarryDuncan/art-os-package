import { mergeUniformConfigs } from "../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { imageVertexEffectTransform } from "./imageVertexEffectTransform";
import { formatVertexParameters } from "../../../helpers/formatVertexParameters";
import {
  DEFAULT_IMAGE_VERTEX_EFFECT_PROPS,
  IMAGE_VERTEX_ATTRIBUTE_CONFIG,
  IMAGE_VERTEX_REQUIRED_FUNCTIONS,
  IMAGE_VERTEX_UNIFORM_CONFIG,
  IMAGE_VERTEX_VARYING_CONFIG,
} from "./imageVertexEffects.consts";
import { ImageVertexEffect } from "../../../../../../../types/materials/shaders/vertexShader.types";
import {
  ShaderFunction,
  AttributeConfig,
} from "../../../../../../../types/materials/shaders/buildShader.types";

export const imageVertexEffect = (effectProps: Partial<ImageVertexEffect>) => {
  const imageVertexEffectProps = formatVertexParameters(
    effectProps as ImageVertexEffect,
    DEFAULT_IMAGE_VERTEX_EFFECT_PROPS as ImageVertexEffect
  ) as ImageVertexEffect;

  const {
    transformation,
    effectUniforms,
    effectVaryings,
    effectFunctions,
    effectAttributes,
  } = imageVertexEffectTransform(imageVertexEffectProps);

  const uniformConfig = IMAGE_VERTEX_UNIFORM_CONFIG;
  const varyingConfig = IMAGE_VERTEX_VARYING_CONFIG;
  const requiredFunctions: ShaderFunction[] = IMAGE_VERTEX_REQUIRED_FUNCTIONS;
  const attributeConfig = IMAGE_VERTEX_ATTRIBUTE_CONFIG as AttributeConfig[];

  const mergedUniformConfigs = mergeUniformConfigs([
    effectUniforms,
    uniformConfig,
  ]);
  const mergedVaryingConfigs = mergeVaryingConfigs([
    effectVaryings,
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
