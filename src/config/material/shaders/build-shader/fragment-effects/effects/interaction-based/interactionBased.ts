import { interactionBasedTransform } from "./interactionBasedTransform";
import {
  FragmentEffectConfig,
  UniformConfig,
  UniformValueConfig,
} from "../../../buildShader.types";

export const interactionBased = (
  effectType: string,
  effectUniforms: UniformValueConfig[],
  unfilteredUniforms: UniformConfig,
  subEffects: FragmentEffectConfig[]
) => {
  const { transformation } = interactionBasedTransform(
    effectType,
    effectUniforms,
    unfilteredUniforms,
    subEffects
  );

  return {
    requiredFunctions: [],
    transformation,
    uniformConfig: unfilteredUniforms,
    varyingConfig: [],
    attributeConfig: [],
  };
};
