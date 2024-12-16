import {
  ColorFragmentEffectProps,
  FragmentEffectData,
  InteractiveEffectProps,
  InteractiveFragmentEffect,
} from "../../../types";
import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeUniformConfigs } from "../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import {
  FRAGMENT_COLOR_NAMES,
  FRAGMENT_EFFECT,
} from "../../fragmentEffects.consts";
import { color } from "../color/color";
import { defaultFragmentEffect } from "../defaultFragmentEffect/defaultFragmentEffect";

export const getInteractiveEffects = (
  transformName: string,
  effectProps: InteractiveFragmentEffect
) => {
  const fragName = FRAGMENT_COLOR_NAMES.INTERACTIVE;

  const {
    uniformConfig: effectUniforms,
    varyingConfig: effectVaryings,
    transformation: effectTransformation,
    fragName: effectPointName,
    requiredFunctions: effectFunctions,
    attributeConfig: effectAttributes,
  } = getEffectData(fragName, effectProps);

  const transformation = `
        vec4 ${effectPointName} = ${transformName};
      
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
    fragName: effectPointName,
  };
};

const getEffectData = (
  pointName: string,
  interactiveEffectProps: InteractiveEffectProps
): FragmentEffectData => {
  const { effectType, effectProps } = interactiveEffectProps;
  switch (effectType) {
    case FRAGMENT_EFFECT.COLOR:
      return color(pointName, effectProps as Partial<ColorFragmentEffectProps>);
    default:
      console.warn(`No interactive effect configured for ${effectProps}`);
      return defaultFragmentEffect();
  }
};
