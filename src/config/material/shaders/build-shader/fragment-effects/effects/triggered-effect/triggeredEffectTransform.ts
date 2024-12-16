import {
  TriggeredFragmentEffect,
  FragmentEffectData,
  ColorFragmentEffectProps,
  OpacityFragmentEffectProps,
  TriggeredFragmentEffectProps,
} from "../../../types";
import { FRAGMENT_EFFECT } from "../../fragmentEffects.consts";
import { color } from "../color/color";
import { defaultFragmentEffect } from "../defaultFragmentEffect/defaultFragmentEffect";
import { opacity } from "../opacity/opacity";
import { DEFAULT_TRIGGERED_EFFECT } from "./triggeredEffect.consts";

export const triggeredEffectTransform = (
  fragColorName: string,
  previousFragColorName: string,
  effectProps: TriggeredFragmentEffect
) => {
  const {
    uniformConfig: effectUniforms,
    varyingConfig: effectVaryings,
    transformation: effectTransformation,
    fragName: fragEffectName,
    requiredFunctions: effectFunctions,
    attributeConfig: effectAttributes,
    fragmentColorInstantiation,
  } = getEffectData(fragColorName, effectProps);

  const transformation = formatTransform(
    fragColorName,
    previousFragColorName,
    fragmentColorInstantiation,
    effectTransformation
  );

  return {
    effectUniforms,
    effectVaryings,
    effectFunctions,
    transformation,
    effectAttributes,
    fragEffectName,
    fragmentColorInstantiation,
  };
};

const formatTransform = (
  fragName: string,
  previousFragColorName: string,
  fragmentColorInstantiation: string | undefined,
  transform: string
) => {
  return `// TRIGGERED FRAG
            vec4 ${fragName} = ${previousFragColorName};
              ${fragmentColorInstantiation ?? ""}
              float isTriggered = 0.0;
              if(uIsTriggered >= 1.0){
                  ${transform}
                  isTriggered = 1.0;
              }
              `;
};

const getEffectData = (
  fragName: string,
  triggeredEffectProps: TriggeredFragmentEffect
): FragmentEffectData => {
  const { effectType, effectProps } = triggeredEffectProps;
  const formattedEffectProps = {
    ...DEFAULT_TRIGGERED_EFFECT,
    ...effectProps,
  } as TriggeredFragmentEffectProps;
  if (formattedEffectProps.declareInTransform === true) {
    console.warn(
      `you are declaring a transform ${fragName} inside the transformed - for triggered effects this may not work`
    );
  }
  switch (effectType) {
    case FRAGMENT_EFFECT.COLOR:
      return color(
        fragName,
        formattedEffectProps as Partial<ColorFragmentEffectProps>
      );
    case FRAGMENT_EFFECT.OPACITY:
      return opacity(
        fragName,
        formattedEffectProps as Partial<OpacityFragmentEffectProps>
      );
    case FRAGMENT_EFFECT.EMPTY:
    default:
      console.warn(`No interactive effect configured for ${effectProps}`);
      return defaultFragmentEffect(fragName, effectProps.declareInTransform);
  }
};
