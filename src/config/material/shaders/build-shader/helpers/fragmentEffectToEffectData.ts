import { FragmentEffectData } from "../../../../../types/materials/shaders/fragmentShader.types";
import { EMPTY_UNIFORM_CONFIG } from "../shader-properties/uniforms/uniforms.consts";

export const fragmentEffectToEffectData = (
  effect: Partial<FragmentEffectData>
) => {
  const {
    attributeConfig,
    requiredFunctions,
    transformation,
    uniformConfig,
    varyingConfig,
  } = effect;
  return {
    effectAttributes: attributeConfig ?? [],
    effectTransform: transformation ?? "",
    effectRequiredFunctions: requiredFunctions ?? [],
    effectUniforms: uniformConfig ?? EMPTY_UNIFORM_CONFIG,
    effectVaryings: varyingConfig ?? [],
  };
};
