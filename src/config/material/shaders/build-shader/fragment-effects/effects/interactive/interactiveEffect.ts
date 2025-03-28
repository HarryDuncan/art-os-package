import { POINT_PARENTS } from "../../../constants/buildShader.consts";
import { InteractiveFragmentEffect } from "../../../types";
import { formatFragmentParameters } from "../../../helpers/formatFragmentParameters";
import { generateUniquePointName } from "../../../helpers/generateUniquePointName";
import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeUniformConfigs } from "../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { FRAGMENT_COLOR_NAMES } from "../../fragmentEffects.consts";

import { DEFAULT_INTERACTIVE_EFFECT } from "./interactiveEffect.consts";
import { getInteractiveEffectTransform } from "./interactiveEffectTransform";

export const getInteractiveEffects = (
  effectProps: Partial<InteractiveFragmentEffect>
) => {
  const effectParams = formatFragmentParameters(
    effectProps,
    DEFAULT_INTERACTIVE_EFFECT
  ) as InteractiveFragmentEffect;

  const {
    uniformConfig: effectUniforms,
    varyingConfig: effectVaryings,
    transformation,
    requiredFunctions: effectFunctions,
    attributeConfig: effectAttributes,
  } = getInteractiveEffectTransform(effectParams);

  const mergedUniformConfigs = mergeUniformConfigs([effectUniforms]);
  const mergedVaryingConfigs = mergeVaryingConfigs([effectVaryings]);
  const mergedRequiredFunction = reduceFunctions([effectFunctions]);
  const mergedAttributeConfigs = mergeAttributeConfigs([effectAttributes]);
  return {
    requiredFunctions: mergedRequiredFunction,
    uniformConfig: mergedUniformConfigs,
    transformation,
    varyingConfig: mergedVaryingConfigs,
    attributeConfig: mergedAttributeConfigs,
  };
};
