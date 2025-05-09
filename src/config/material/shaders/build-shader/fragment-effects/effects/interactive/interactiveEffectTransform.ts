import {
  FragmentEffectData,
  ColorFragmentEffectProps,
  InteractiveFragmentEffect,
} from "../../../../../../../types/materials/shaders/fragmentShader.types";
import { FRAGMENT_EFFECT } from "../../../../../../../consts/materials/fragmentEffects.consts";
import { color } from "../color/color";
import { defaultFragmentEffect } from "../defaultFragmentEffect/defaultFragmentEffect";

export const getInteractiveEffectTransform = (
  interactiveEffectProps: InteractiveFragmentEffect
) => {
  const {
    uniformConfig,
    varyingConfig,
    transformation: effectTransformation,

    requiredFunctions,
    attributeConfig,
  } = getEffectData(interactiveEffectProps);
  const transformation = `
    

    if(vAffected == 1.0){
        ${effectTransformation};
    }
`;
  return {
    uniformConfig,
    varyingConfig,
    transformation,
    requiredFunctions,
    attributeConfig,
  };
};
const getEffectData = (
  interactiveEffectProps: InteractiveFragmentEffect
): FragmentEffectData => {
  const { effectType, effectProps } = interactiveEffectProps;
  switch (effectType) {
    case FRAGMENT_EFFECT.COLOR:
      return color(effectProps as Partial<ColorFragmentEffectProps>);
    default:
      console.warn(`No interactive effect configured for ${effectProps}`);
      return defaultFragmentEffect();
  }
};
