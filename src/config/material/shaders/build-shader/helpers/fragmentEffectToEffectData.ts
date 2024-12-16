import { EMPTY_UNIFORM_CONFIG } from "../shader-properties/uniforms/uniforms.consts";
import { FragmentEffectData } from "../types";

export const fragmentEffectToEffectData = (
  effect: Partial<FragmentEffectData>
) => {
  const {
    attributeConfig,
    fragName,
    requiredFunctions,
    transformation,
    uniformConfig,
    varyingConfig,
  } = effect;
  return {
    effectAttributes: attributeConfig ?? [],
    effectFragName: fragName,
    effectTransform: transformation,
    effectRequiredFunctions: requiredFunctions ?? [],
    effectUniforms: uniformConfig ?? EMPTY_UNIFORM_CONFIG,
    effectVaryings: varyingConfig ?? [],
  };
};
