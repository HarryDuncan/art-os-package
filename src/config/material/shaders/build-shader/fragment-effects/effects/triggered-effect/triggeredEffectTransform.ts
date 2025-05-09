import {
  TriggeredFragmentEffect,
  FragmentEffectData,
  TriggeredFragmentEffectProps,
  ColorFragmentEffectProps,
  OpacityFragmentEffectProps,
} from "../../fragmentShader.types";
import { FRAGMENT_EFFECT } from "../../fragmentEffects.consts";
import { color } from "../color/color";
import { defaultFragmentEffect } from "../defaultFragmentEffect/defaultFragmentEffect";
import { opacity } from "../opacity/opacity";
import { DEFAULT_TRIGGERED_EFFECT } from "./triggeredEffect.consts";

export const triggeredEffectTransform = (
  effectProps: TriggeredFragmentEffect
) => {
  const {
    uniformConfig: effectUniforms,
    varyingConfig: effectVaryings,
    transformation: effectTransformation,
    requiredFunctions: effectFunctions,
    attributeConfig: effectAttributes,
  } = getEffectData(effectProps);

  const transformation = formatTransform(effectTransformation);

  return {
    effectUniforms,
    effectVaryings,
    effectFunctions,
    transformation,
    effectAttributes,
  };
};

const formatTransform = (transform: string) => {
  return `// TRIGGERED FRAG
           
           
              float isTriggered = 0.0;
              if(uIsTriggered >= 1.0){
                  ${transform}
                  isTriggered = 1.0;
              }
              `;
};

const getEffectData = (
  triggeredEffectProps: TriggeredFragmentEffect
): FragmentEffectData => {
  const { effectType, effectProps } = triggeredEffectProps;
  const formattedEffectProps = {
    ...DEFAULT_TRIGGERED_EFFECT,
    ...effectProps,
  } as TriggeredFragmentEffectProps;

  switch (effectType) {
    case FRAGMENT_EFFECT.COLOR:
      return color(formattedEffectProps as Partial<ColorFragmentEffectProps>);
    case FRAGMENT_EFFECT.OPACITY:
      return opacity(
        formattedEffectProps as Partial<OpacityFragmentEffectProps>
      );
    case FRAGMENT_EFFECT.EMPTY:
    default:
      console.warn(`No interactive effect configured for ${effectProps}`);
      return defaultFragmentEffect();
  }
};
