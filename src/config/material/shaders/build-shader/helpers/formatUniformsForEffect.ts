import { UniformConfig, UniformValueConfig } from "../../../../../types";

export const formatUniformsForEffect = (
  uniforms: UniformConfig,
  effectId: string
): UniformValueConfig[] => {
  const effectUniforms =
    uniforms.customUniforms
      ?.concat(uniforms.interactionMappedUniforms ?? [])
      .filter((uniform) => {
        return uniform.effectIds?.includes(effectId);
      }) ?? [];
  return effectUniforms;
};
