import { FragmentEffectProps } from "../types";
import { DEFAULT_FRAGMENT_EFFECT_PARAMS } from "../fragment-effects/fragmentEffects.consts";

export const formatFragmentParameters = (
  parsedEffectProps: Partial<FragmentEffectProps>,
  defaultEffectProps: FragmentEffectProps
) => {
  return {
    ...DEFAULT_FRAGMENT_EFFECT_PARAMS,
    ...defaultEffectProps,
    ...parsedEffectProps,
  };
};
