import { ShaderEffectConfig, VertexEffectConfig } from "../buildShader.types";
import { FragmentEffectConfig } from "../buildShader.types";
import { SHADER_TYPES } from "../constants";

export const formatShaderEffects = (
  shaderEffectConfigs: ShaderEffectConfig[]
) => {
  const vertexEffectConfigs = shaderEffectConfigs.filter(
    (config) => config.shaderType === SHADER_TYPES.VERTEX
  ) as VertexEffectConfig[];
  const fragmentEffectConfigs = shaderEffectConfigs.filter(
    (config) => config.shaderType === SHADER_TYPES.FRAGMENT
  ) as FragmentEffectConfig[];

  // Process vertex effects to organize interactive effects as subEffects
  const formattedVertexEffects = vertexEffectConfigs.reduce((acc, effect) => {
    // If this effect has interactiveEffectIds, it should be a sub-effect
    // of the effects it references, so don't add it directly
    if (effect.isInteractive && effect.interactiveEffectIds) {
      return acc;
    }

    // Check if other effects reference this effect
    const effectsReferencingThis = vertexEffectConfigs.filter(
      (interactiveEffect) =>
        interactiveEffect.isInteractive &&
        interactiveEffect.interactiveEffectIds &&
        interactiveEffect.interactiveEffectIds.includes(effect.id)
    );

    if (effectsReferencingThis.length > 0) {
      // Add this effect with the interactive effects as its subEffects
      acc.push({
        ...effect,
        subEffects: effectsReferencingThis,
      });
    } else {
      // Add regular effects normally
      acc.push(effect);
    }

    return acc;
  }, [] as VertexEffectConfig[]);

  const formattedFragmentEffects = fragmentEffectConfigs.reduce(
    (acc, effect) => {
      // If this effect has interactiveEffectIds, it should be a sub-effect
      // of the effects it references, so don't add it directly
      if (effect.isInteractive && effect.interactiveEffectIds) {
        return acc;
      }

      // Check if other effects reference this effect
      const effectsReferencingThis = fragmentEffectConfigs.filter(
        (interactiveEffect) =>
          interactiveEffect.isInteractive &&
          interactiveEffect.interactiveEffectIds &&
          interactiveEffect.interactiveEffectIds.includes(effect.id)
      );

      if (effectsReferencingThis.length > 0) {
        // Add this effect with the interactive effects as its subEffects
        acc.push({
          ...effect,
          subEffects: effectsReferencingThis,
        });
      } else {
        // Add regular effects normally
        acc.push(effect);
      }

      return acc;
    },
    [] as FragmentEffectConfig[]
  );

  return {
    formattedVertexEffects,
    formattedFragmentEffects,
  };
};
