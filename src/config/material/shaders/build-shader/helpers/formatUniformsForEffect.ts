import { ParameterConfig } from "../buildShader.types";

export const formatUniformsForEffect = (
  uniforms: ParameterConfig[],
  effectId: string
): ParameterConfig[] => {
  const effectUniforms = uniforms.filter((uniform) => {
    return uniform.effectIds?.includes(effectId);
  });
  return effectUniforms;
};
