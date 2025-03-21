import {
  AttributeConfig,
  ShaderFunction,
  TriggeredVertexEffect,
  TriggeredVertexEffectProps,
} from "../../../types";
import { mergeUniformConfigs } from "../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import {
  DEFAULT_TRIGGERED_EFFECT,
  TRIGGERED_UNIFORM_CONFIG,
  TRIGGERED_VARYING_CONFIG,
} from "./triggeredEffect.consts";
import { triggeredEffectTransform } from "./triggeredEffectTransform";
import { formatVertexParameters } from "../../../helpers/formatVertexParameters";

export const triggeredEffect = (effectProps: TriggeredVertexEffect) => {
  const triggeredEffectProps = formatVertexParameters(
    effectProps,
    DEFAULT_TRIGGERED_EFFECT as TriggeredVertexEffectProps
  ) as TriggeredVertexEffect;

  const uniformConfig = TRIGGERED_UNIFORM_CONFIG;
  const varyingConfig = TRIGGERED_VARYING_CONFIG;
  const {
    transformation,
    effectUniforms,
    effectVaryings,

    effectFunctions,
    effectAttributes,
  } = triggeredEffectTransform(triggeredEffectProps);

  const requiredFunctions: ShaderFunction[] = [];
  const attributeConfig = [] as AttributeConfig[];

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
