import { VertexEffectProps } from "../types";
import { DEFAULT_VERTEX_EFFECT_PARAMS } from "../vertex-effects/vertexEffects.consts";

export const formatVertexParameters = (
  parsedEffectProps: Partial<VertexEffectProps>,
  defaultEffectProps: VertexEffectProps
) => {
  return {
    ...DEFAULT_VERTEX_EFFECT_PARAMS,
    ...defaultEffectProps,
    ...parsedEffectProps,
  };
};
