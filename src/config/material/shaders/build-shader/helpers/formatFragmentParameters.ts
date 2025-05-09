import { FragmentEffectProps } from "../../../../../types/materials/shaders/fragmentShader.types";
import { DEFAULT_FRAGMENT_EFFECT_PARAMS } from "../../../../../consts/materials/fragmentEffects.consts";

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
