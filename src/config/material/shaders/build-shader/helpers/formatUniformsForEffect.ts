import { UniformConfig } from "../buildShader.types";

export const formatUniformsForEffect = (
  uniforms: UniformConfig[],
  effectId: string
): UniformConfig[] => {
  const effectUniforms = uniforms.filter((uniform) => {
    return uniform.effectIds?.includes(effectId);
  });
  return effectUniforms;
};
