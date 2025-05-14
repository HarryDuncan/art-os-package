import {
  UniformConfig,
  UniformValueConfig,
  VertexEffectConfig,
} from "../../../buildShader.types";
import {
  INTERACTION_BASED_UNIFORMS,
  INTERACTION_BASED_ATTRIBUTES,
} from "./interactionBased.consts";
import { interactionBasedTransform } from "./interactionBasedTransform";

export const interactionBased = (
  effectType: string,
  effectUniforms: UniformValueConfig[],
  unfilteredUniforms: UniformConfig,
  subEffects: VertexEffectConfig[]
) => {
  const { transformation, requiredFunctions, varyingConfig } =
    interactionBasedTransform(
      effectType,
      effectUniforms,
      unfilteredUniforms,
      subEffects
    );
  return {
    requiredFunctions: requiredFunctions,
    uniformConfig: INTERACTION_BASED_UNIFORMS,
    attributeConfig: INTERACTION_BASED_ATTRIBUTES,
    transformation,
    varyingConfig: varyingConfig,
  };
};
