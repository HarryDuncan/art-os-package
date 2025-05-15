import {
  UniformConfig,
  UniformValueConfig,
  VertexEffectConfig,
  VaryingConfig,
} from "../../../buildShader.types";
import {
  INTERACTION_BASED_UNIFORMS,
  INTERACTION_BASED_ATTRIBUTES,
} from "./interactionBased.consts";
import { interactionBasedTransform } from "./interactionBasedTransform";

export const interactionBased = (
  effectType: string,
  effectUniforms: UniformValueConfig[],
  effectVaryings: VaryingConfig[],
  subEffects: VertexEffectConfig[],
  unfilteredUniforms: UniformConfig,
  unfilteredVaryings: VaryingConfig[]
) => {
  const { transformation, requiredFunctions, varyingConfig } =
    interactionBasedTransform(
      effectType,
      effectUniforms,
      effectVaryings,
      subEffects,
      unfilteredUniforms,
      unfilteredVaryings
    );
  return {
    requiredFunctions: requiredFunctions,
    uniformConfig: INTERACTION_BASED_UNIFORMS,
    attributeConfig: INTERACTION_BASED_ATTRIBUTES,
    transformation,
    varyingConfig: varyingConfig,
  };
};
