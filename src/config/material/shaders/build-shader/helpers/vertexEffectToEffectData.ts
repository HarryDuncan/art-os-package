import { EMPTY_UNIFORM_CONFIG } from "../shader-properties/uniforms/uniforms.consts";
import { VertexEffectData } from "../vertex-effects/vertexEffects.types";

export const vertexEffectToEffectData = (
  effect: Partial<VertexEffectData> & {
    transformation: string;
  }
): VertexEffectData => {
  const {
    attributeConfig,
    requiredFunctions,
    transformation,
    uniformConfig,
    varyingConfig,
  } = effect;
  return {
    transformation,
    attributeConfig: attributeConfig ?? [],
    requiredFunctions: requiredFunctions ?? [],
    uniformConfig: uniformConfig ?? EMPTY_UNIFORM_CONFIG,
    varyingConfig: varyingConfig ?? [],
  };
};
