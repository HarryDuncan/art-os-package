import { EMPTY_UNIFORM_CONFIG } from "../shader-properties/uniforms/uniforms.consts";
import { VertexEffectData } from "../vertex-effects/vertexEffects.types";

export const vertexEffectToEffectData = (
  effect: Partial<VertexEffectData> & {
    pointName: string;
    transformation: string;
  }
): VertexEffectData => {
  const {
    attributeConfig,
    vertexPointInstantiation,
    pointName,
    requiredFunctions,
    transformation,
    uniformConfig,
    varyingConfig,
  } = effect;
  return {
    pointName,
    transformation,
    attributeConfig: attributeConfig ?? [],
    requiredFunctions: requiredFunctions ?? [],
    uniformConfig: uniformConfig ?? EMPTY_UNIFORM_CONFIG,
    varyingConfig: varyingConfig ?? [],
    vertexPointInstantiation: vertexPointInstantiation ?? undefined,
  };
};
