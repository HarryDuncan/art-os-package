import { VertexEffectData } from "../vertex-effects/vertexEffects.types";

export const vertexEffectToEffectData = (
  effect: Partial<VertexEffectData> & {
    transformation: string;
  }
): VertexEffectData => {
  const {
    attributeConfigs,
    requiredFunctions,
    transformation,
    uniformConfigs,
    varyingConfigs,
  } = effect;
  return {
    transformation,
    attributeConfigs: attributeConfigs ?? [],
    requiredFunctions: requiredFunctions ?? [],
    uniformConfigs: uniformConfigs ?? [],
    varyingConfigs: varyingConfigs ?? [],
  };
};
