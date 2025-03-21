import { formatFragmentParameters } from "../../../helpers/formatFragmentParameters";
import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeUniformConfigs } from "../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { DEFAULT_INTERACTIVE_EFFECT } from "./interactiveEffect.consts";
import { getInteractiveEffectTransform } from "./interactiveEffectTransform";
export const getInteractiveEffects = (effectProps) => {
    const effectParams = formatFragmentParameters(effectProps, DEFAULT_INTERACTIVE_EFFECT);
    const { uniformConfig: effectUniforms, varyingConfig: effectVaryings, transformation, requiredFunctions: effectFunctions, attributeConfig: effectAttributes, } = getInteractiveEffectTransform(effectParams);
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
