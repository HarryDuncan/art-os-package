import { mergeUniformConfigs } from "../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import {
  DEFAULT_TRIGGERED_EFFECT,
  TRIGGERED_ATTRIBUTE_CONFIGS,
  TRIGGERED_FUNCTIONS,
  TRIGGERED_UNIFORM_CONFIG,
  TRIGGERED_VARYING_CONFIG,
} from "./triggeredEffect.consts";
import { triggeredEffectTransform } from "./triggeredEffectTransform";
import { formatFragmentParameters } from "../../../helpers/formatFragmentParameters";
import {
  TriggeredFragmentEffect,
  FragmentEffectData,
} from "../../fragmentShader.types";

export const triggeredEffect = (
  effectProps: Partial<TriggeredFragmentEffect>
): FragmentEffectData => {
  const effectParams = formatFragmentParameters(
    effectProps,
    DEFAULT_TRIGGERED_EFFECT
  ) as TriggeredFragmentEffect;
  const {
    effectUniforms,
    effectVaryings,
    effectFunctions,
    transformation,
    effectAttributes,
  } = triggeredEffectTransform(effectParams);

  const mergedUniformConfigs = mergeUniformConfigs([
    effectUniforms,
    TRIGGERED_UNIFORM_CONFIG,
  ]);
  const mergedVaryingConfigs = mergeVaryingConfigs([
    effectVaryings,
    TRIGGERED_VARYING_CONFIG,
  ]);
  const mergedRequiredFunction = reduceFunctions([
    effectFunctions,
    TRIGGERED_FUNCTIONS,
  ]);
  const mergedAttributeConfigs = mergeAttributeConfigs([
    effectAttributes,
    TRIGGERED_ATTRIBUTE_CONFIGS,
  ]);
  return {
    requiredFunctions: mergedRequiredFunction,
    uniformConfig: mergedUniformConfigs,
    attributeConfig: mergedAttributeConfigs,
    varyingConfig: mergedVaryingConfigs,
    transformation,
  };
};
