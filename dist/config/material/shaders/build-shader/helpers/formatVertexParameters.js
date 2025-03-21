import { DEFAULT_VERTEX_EFFECT_PARAMS } from "../vertex-effects/vertexEffects.consts";
export const formatVertexParameters = (parsedEffectProps, defaultEffectProps) => {
    return Object.assign(Object.assign(Object.assign({}, DEFAULT_VERTEX_EFFECT_PARAMS), defaultEffectProps), parsedEffectProps);
};
