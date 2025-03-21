import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeUniformConfigs } from "../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { FRAG_COLOR_NAME, FRAGMENT_EFFECT } from "../../fragmentEffects.consts";
import { color } from "../color/color";
import { defaultFragmentEffect } from "../defaultFragmentEffect/defaultFragmentEffect";
export const getInteractiveEffects = (transformName, effectProps) => {
    const { uniformConfig: effectUniforms, varyingConfig: effectVaryings, transformation: effectTransformation, requiredFunctions: effectFunctions, attributeConfig: effectAttributes, } = getEffectData(effectProps);
    const transformation = `
        vec4 ${FRAG_COLOR_NAME} = ${transformName};
      
        if(vAffected == 1.0){
            ${effectTransformation};
        }
    `;
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
const getEffectData = (interactiveEffectProps) => {
    const { effectType, effectProps } = interactiveEffectProps;
    switch (effectType) {
        case FRAGMENT_EFFECT.COLOR:
            return color(effectProps);
        default:
            console.warn(`No interactive effect configured for ${effectProps}`);
            return defaultFragmentEffect();
    }
};
