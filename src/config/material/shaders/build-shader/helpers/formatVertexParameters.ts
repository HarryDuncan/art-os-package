import { VertexEffectProps } from "../../../../../types/materials/shaders/vertexShader.types";
import { DEFAULT_VERTEX_EFFECT_PARAMS } from "../../../../../consts/materials/vertexEffects.consts";

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
