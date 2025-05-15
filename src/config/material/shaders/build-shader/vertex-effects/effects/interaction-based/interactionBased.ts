import { VertexEffectProps } from "../../vertexEffects.types";
import {
  INTERACTION_BASED_UNIFORMS,
  INTERACTION_BASED_ATTRIBUTES,
} from "./interactionBased.consts";
import { interactionBasedTransform } from "./interactionBasedTransform";

export const interactionBased = (effectProps: VertexEffectProps) => {
  const {
    effectUniforms,
    effectVaryings,
    subEffects,
    effectType,
    unfilteredUniforms,
    unfilteredVaryings,
  } = effectProps;
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
