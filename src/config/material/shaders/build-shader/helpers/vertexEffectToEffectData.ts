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
    uniformConfig: uniformConfig ?? [],
    varyingConfig: varyingConfig ?? [],
  };
};
