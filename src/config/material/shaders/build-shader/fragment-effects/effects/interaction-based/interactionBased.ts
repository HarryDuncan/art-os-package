import { interactionBasedTransform } from "./interactionBasedTransform";
import {
  FragmentEffectData,
  FragmentEffectProps,
} from "../../fragmentShader.types";

export const interactionBased = (
  effectProps: FragmentEffectProps
): FragmentEffectData => {
  const { effectType, effectUniforms, unfilteredUniforms, subEffects } =
    effectProps;
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
