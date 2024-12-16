import {
  ColorFragmentEffectProps,
  FragmentEffectData,
  InteractiveEffectProps,
} from "../../../types";
import { FRAGMENT_EFFECT } from "../../fragmentEffects.consts";
import { color } from "../color/color";
import { defaultFragmentEffect } from "../defaultFragmentEffect/defaultFragmentEffect";

export const getInteractiveEffectTransform = (
  fragColorName: string,
  previousFragName: string,
  interactiveEffectProps: InteractiveEffectProps
) => {
  const {
    uniformConfig,
    varyingConfig,
    transformation: effectTransformation,
    fragName,
    requiredFunctions,
    attributeConfig,
    fragmentColorInstantiation,
  } = getEffectData(fragColorName, interactiveEffectProps);
  const transformation = `
    vec4 ${fragName} = ${previousFragName};
    ${fragmentColorInstantiation}
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
    fragmentColorInstantiation,
  };
};
const getEffectData = (
  fragName: string,
  interactiveEffectProps: InteractiveEffectProps
): FragmentEffectData => {
  const { effectType, effectProps } = interactiveEffectProps;
  switch (effectType) {
    case FRAGMENT_EFFECT.COLOR:
      return color(fragName, effectProps as Partial<ColorFragmentEffectProps>);
    default:
      console.warn(`No interactive effect configured for ${effectProps}`);
      return defaultFragmentEffect();
  }
};
