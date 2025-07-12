import {
  EffectFunctionConfig,
  ShaderEffectConfig,
  VertexEffectConfig,
} from "../buildShader.types";
import { FragmentEffectConfig } from "../buildShader.types";
import { SHADER_TYPES } from "../constants";
import { EFFECT_FUNCTIONS } from "../effect-functions";

const nestSubEffects = <T extends ShaderEffectConfig>(
  effectConfigs: T[]
): T[] =>
  effectConfigs.reduce((acc: T[], effect: T) => {
    if (effect.subEffectIds && effect.subEffectIds.length > 0) {
      const effectsReferencingThis = effectConfigs.filter((subEffect) =>
        effect.subEffectIds?.includes(subEffect.id)
      );
      if (effectsReferencingThis.length > 0) {
        acc.push({
          ...effect,
          subEffects: effectsReferencingThis,
        } as T);
      } else {
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
  }, [] as T[]);

export const formatShaderEffects = (
  shaderEffectConfigs: ShaderEffectConfig[],
  effectFunctionConfigs: EffectFunctionConfig[]
) => {
  const vertexEffectConfigs = nestSubEffects(
    shaderEffectConfigs.filter(
      (config) => config.shaderType === SHADER_TYPES.VERTEX
    ) as VertexEffectConfig[]
  ) as VertexEffectConfig[];

  const fragmentEffectConfigs = nestSubEffects(
    shaderEffectConfigs.filter(
      (config) => config.shaderType === SHADER_TYPES.FRAGMENT
    ) as FragmentEffectConfig[]
  ) as FragmentEffectConfig[];

  const fragmentEffectFunctionConfigs = effectFunctionConfigs.filter(
    (config) => {
      const { outputMapping } = config;
      const outputIds = Object.values(outputMapping).map(
        (mapping) => mapping.itemId
      );
      return outputIds.some((id) =>
        fragmentEffectConfigs.some((config) => config.id === id)
      );
    }
  );

  const vertexEffectFunctions = vertexEffectConfigs.map((effect) => {
    const defaultEffectFunction = {
      id: effect.id,
      functionId: "DEFAULT_EFFECT_FUNCTION",
      effects: [effect],
      outputMapping: {},
      inputMapping: {},
    };
    return defaultEffectFunction;
  });

  const fragmentEffectFunctions = fragmentEffectConfigs.reduce(
    (acc, effect) => {
      // Check if there are any fragmentEffectFunctionConfigs that reference this effect
      const matchingFunctionConfig = fragmentEffectFunctionConfigs.find(
        (config) => {
          const { outputMapping } = config;
          const outputIds = Object.values(outputMapping).map(
            (mapping) => mapping.itemId
          );
          return outputIds.includes(effect.id);
        }
      );

      if (matchingFunctionConfig) {
        // Check if we already have a function config for this effect
        const existingFunctionIndex = acc.findIndex(
          (func) => func.id === matchingFunctionConfig.id
        );

        if (existingFunctionIndex >= 0) {
          // Merge the effect into the existing function
          acc[existingFunctionIndex].effects.push(effect);
        } else {
          // Create new function config with this effect
          acc.push({
            ...matchingFunctionConfig,
            effects: [effect],
          });
        }
      } else {
        // Return default effect function
        const defaultEffectFunction = {
          id: effect.id,
          functionId: EFFECT_FUNCTIONS.DEFAULT,
          effects: [effect],
          outputMapping: {},
          inputMapping: {},
        };
        acc.push(defaultEffectFunction);
      }

      return acc;
    },
    [] as (
      | EffectFunctionConfig
      | {
          id: string;
          functionId: string;
          effects: FragmentEffectConfig[];
          outputMapping: Record<string, unknown>;
          inputMapping: Record<string, unknown>;
        }
    )[]
  );

  return {
    vertexEffectFunctions,
    fragmentEffectFunctions,
  };
};
