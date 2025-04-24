import { VERTEX_EFFECTS } from "../../../../../consts";
import { UniformConfig, UniformValueConfig } from "../../../../../types";

const NON_FILTERED_EFFECTS = [VERTEX_EFFECTS.FILTER];
export const formatUniformsForEffect = (
  uniforms: UniformConfig,
  effectType: string
): UniformValueConfig[] => {
  const effectUniforms =
    uniforms.customUniforms
      ?.concat(uniforms.interactionMappedUniforms ?? [])
      .filter((uniform) => {
        if (NON_FILTERED_EFFECTS.includes(effectType)) {
          return true;
        }
        return uniform.effectIds?.includes(effectType);
      }) ?? [];
  return effectUniforms;
};
