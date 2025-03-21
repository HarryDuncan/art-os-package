import { DEFAULT_FRAGMENT_EFFECT_PARAMS } from "../fragment-effects/fragmentEffects.consts";
export const formatFragmentParameters = (parsedEffectProps, defaultEffectProps) => {
    return Object.assign(Object.assign(Object.assign({}, DEFAULT_FRAGMENT_EFFECT_PARAMS), defaultEffectProps), parsedEffectProps);
};
