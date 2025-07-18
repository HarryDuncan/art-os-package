import {
  ShaderEffectConfig,
  OperatorConfig,
  SHADER_TYPES,
  VertexEffectConfig,
  FragmentEffectConfig,
  OPERATOR_TYPES,
} from "../schema";
import { getShaderConfigsByType } from "../utils";

const nestSubEffects = <T extends ShaderEffectConfig>(
  effectConfigs: T[]
): T[] =>
  effectConfigs.reduce((acc: T[], effect: T) => {
    if (effect.subEffectIds && effect.subEffectIds.length > 0) {
      const effectsReferencingThis = effectConfigs.filter((subEffect) =>
        effect.subEffectIds?.includes(subEffect.guid)
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
    const isSubEffect = acc.some((ef) =>
      ef.subEffectIds?.includes(effect.guid)
    );
    if (isSubEffect) {
      return acc;
    } else {
      acc.push(effect);
    }
    return acc;
  }, [] as T[]);

const DEFAULT_EFFECT_FUNCTION_CONFIG = {
  id: "DEFAULT_EFFECT_FUNCTION",
  functionId: OPERATOR_TYPES.DEFAULT,
  effects: [],
  outputMapping: {},
  inputMapping: {},
};

export const formatShaderEffects = (
  shaderEffectConfigs: ShaderEffectConfig[],
  operatorConfigs: OperatorConfig[]
) => {
  const vertexEffectConfigs = nestSubEffects(
    getShaderConfigsByType(
      shaderEffectConfigs,
      SHADER_TYPES.VERTEX
    ) as VertexEffectConfig[]
  ) as VertexEffectConfig[];

  const fragmentEffectConfigs = nestSubEffects(
    getShaderConfigsByType(
      shaderEffectConfigs,
      SHADER_TYPES.FRAGMENT
    ) as FragmentEffectConfig[]
  ) as FragmentEffectConfig[];

  const fragmentEffectFunctionConfigs = operatorConfigs.filter((config) => {
    const { outputMapping } = config;
    const outputIds = Object.values(outputMapping).map(
      (mapping) => mapping.itemId
    );
    return outputIds.some((id) =>
      fragmentEffectConfigs.some((config) => config.guid === id)
    );
  });

  const vertexEffectFunctionConfigs = operatorConfigs.filter((config) => {
    const { outputMapping } = config;
    const outputIds = Object.values(outputMapping).map(
      (mapping) => mapping.itemId
    );
    return outputIds.some((id) =>
      vertexEffectConfigs.some((config) => config.guid === id)
    );
  });

  const vertexEffectFunctions = vertexEffectConfigs.reduce((acc, effect) => {
    // Check if there are any fragmentEffectFunctionConfigs that reference this effect
    const matchingFunctionConfig = vertexEffectFunctionConfigs.find(
      (config) => {
        const { outputMapping } = config;
        const outputIds = Object.values(outputMapping).map(
          (mapping) => mapping.itemId
        );
        return outputIds.includes(effect.guid);
      }
    );

    if (matchingFunctionConfig) {
      // Check if we already have a function config for this effect
      const existingFunctionIndex = acc.findIndex(
        (func) => func.guid === matchingFunctionConfig.guid
      );

      if (existingFunctionIndex >= 0 && acc[existingFunctionIndex]) {
        // Merge the effect into the existing function
        acc[existingFunctionIndex]?.effects?.push(effect);
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
        ...DEFAULT_EFFECT_FUNCTION_CONFIG,
        guid: effect.guid,
        effects: [effect],
      };
      acc.push(defaultEffectFunction);
    }

    return acc;
  }, [] as OperatorConfig[]);

  const fragmentEffectFunctions = fragmentEffectConfigs.reduce(
    (acc, effect) => {
      // Check if there are any fragmentEffectFunctionConfigs that reference this effect
      const matchingFunctionConfig = fragmentEffectFunctionConfigs.find(
        (config) => {
          const { outputMapping } = config;
          const outputIds = Object.values(outputMapping).map(
            (mapping) => mapping.itemId
          );
          return outputIds.includes(effect.guid);
        }
      );

      if (matchingFunctionConfig) {
        // Check if we already have a function config for this effect
        const existingFunctionIndex = acc.findIndex(
          (func) => func.guid === matchingFunctionConfig.guid
        );

        if (existingFunctionIndex >= 0 && acc[existingFunctionIndex]) {
          // Merge the effect into the existing function
          acc[existingFunctionIndex]?.effects?.push(effect);
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
          guid: effect.guid,
          functionId: OPERATOR_TYPES.DEFAULT,
          effects: [effect],
          outputMapping: {},
          inputMapping: {},
        };
        acc.push(defaultEffectFunction);
      }

      return acc;
    },
    [] as OperatorConfig[]
  );

  return {
    vertexEffects: vertexEffectFunctions,
    fragmentEffects: fragmentEffectFunctions,
  };
};
