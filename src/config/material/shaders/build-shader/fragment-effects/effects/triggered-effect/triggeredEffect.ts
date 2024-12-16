import { POINT_PARENTS } from "../../../constants/buildShader.consts";
import { FragmentEffectData, TriggeredFragmentEffect } from "../../../types";
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

import { generateUniquePointName } from "../../../helpers/generateUniquePointName";
import { FRAGMENT_COLOR_NAMES } from "../../fragmentEffects.consts";
import { triggeredEffectTransform } from "./triggeredEffectTransform";
import { formatFragmentParameters } from "../../../helpers/formatFragmentParameters";

export const triggeredEffect = (
  previousFragName: string,
  effectProps: Partial<TriggeredFragmentEffect>
): FragmentEffectData => {
  const fragName = generateUniquePointName(
    FRAGMENT_COLOR_NAMES.TRIGGERED,
    POINT_PARENTS.TRIGGERED
  );
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
    fragEffectName,
    fragmentColorInstantiation,
  } = triggeredEffectTransform(fragName, previousFragName, effectParams);

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
    fragName: fragEffectName,
    fragmentColorInstantiation,
  };
};
