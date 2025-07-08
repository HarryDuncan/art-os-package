import {
  EffectFunctionConfig,
  ShaderEffectConfig,
  VertexEffectConfig,
} from "../buildShader.types";
import { FragmentEffectConfig } from "../buildShader.types";
import { SHADER_TYPES } from "../constants";

export const formatShaderEffects = (
  shaderEffectConfigs: ShaderEffectConfig[],
  effectFunctionConfigs: EffectFunctionConfig[]
) => {
  console.log("effectFunctionConfigs", effectFunctionConfigs);
  const vertexEffectConfigs = shaderEffectConfigs.filter(
    (config) => config.shaderType === SHADER_TYPES.VERTEX
  ) as VertexEffectConfig[];
  const fragmentEffectConfigs = shaderEffectConfigs.filter(
    (config) => config.shaderType === SHADER_TYPES.FRAGMENT
  ) as FragmentEffectConfig[];

  const formattedVertexEffects = vertexEffectConfigs.reduce((acc, effect) => {
    if (effect.subEffectIds && effect.subEffectIds.length > 0) {
      const effectsReferencingThis = vertexEffectConfigs.filter((subEffect) =>
        effect.subEffectIds?.includes(subEffect.id)
      );
      if (effectsReferencingThis.length > 0) {
        // Add this effect with the referencing effects as its subEffects
        acc.push({
          ...effect,
          subEffects: effectsReferencingThis,
        });
      } else {
        // Add regular effects normally
        acc.push(effect);
      }
      return acc;
    }

    const isSubEffect = acc.some((ef) => ef.subEffectIds?.includes(effect.id));
    if (isSubEffect) {
      return acc;
    } else {
      acc.push(effect);
    }

    return acc;
  }, [] as VertexEffectConfig[]);
  const vertexEffectFunctions = formattedVertexEffects.map((effect) => {
    const defaultEffectFunction = {
      id: effect.id,
      functionId: "DEFAULT_EFFECT_FUNCTION",
      effects: [effect],
      outputMapping: {},
      inputMapping: {},
    };
    return defaultEffectFunction;
  });

  const formattedFragmentEffects = fragmentEffectConfigs.reduce(
    (acc, effect) => {
      if (effect.subEffectIds && effect.subEffectIds.length > 0) {
        const effectsReferencingThis = fragmentEffectConfigs.filter(
          (subEffect) => effect.subEffectIds?.includes(subEffect.id)
        );
        if (effectsReferencingThis.length > 0) {
          // Add this effect with the referencing effects as its subEffects
          acc.push({
            ...effect,
            subEffects: effectsReferencingThis,
          });
        } else {
          // Add regular effects normally
          acc.push(effect);
        }
        return acc;
      }

      const isSubEffect = acc.some((ef) =>
        ef.subEffectIds?.includes(effect.id)
      );
      if (isSubEffect) {
        return acc;
      } else {
        acc.push(effect);
      }

      return acc;
    },
    [] as FragmentEffectConfig[]
  );
  const fragmentEffectFunctions = formattedFragmentEffects.map((effect) => {
    const defaultEffectFunction = {
      id: effect.id,
      functionId: "DEFAULT_EFFECT_FUNCTION",
      effects: [effect],
      outputMapping: {},
      inputMapping: {},
    };
    return defaultEffectFunction;
  });

  return {
    vertexEffectFunctions,
    fragmentEffectFunctions,
  };
};
