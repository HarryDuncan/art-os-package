import {
  EffectConfig,
  OperatorConfig,
  OPERATOR_TYPES,
  EffectConfig,
} from "../schema";
import { formatEffectsAndSchemas } from "./effect-transforms/effectsAndSchemas";

const DEFAULT_EFFECT_FUNCTION_CONFIG = {
  id: "DEFAULT_EFFECT_FUNCTION",
  schemaId: OPERATOR_TYPES.DEFAULT,
  effects: [],
  outputMapping: {},
  inputMapping: {},
};

export const formatShaderEffects = (
  shaderEffectConfigs: EffectConfig[],
  operatorConfigs: OperatorConfig[],
  functionConfigs: EffectConfig[],
  schemas: Record<string, Record<string, unknown>>
) => {
  const { vertexEffects, fragmentEffects, functionConfigsWithSchemas } =
    formatEffectsAndSchemas(shaderEffectConfigs, functionConfigs, schemas);

  const fragmentOperatorConfigs = operatorConfigs.filter((config) => {
    const { outputMapping } = config;
    const outputIds = Object.values(outputMapping).map(
      (mapping) => mapping.itemId
    );
    return outputIds.some((id) =>
      fragmentEffects.some((config) => config.guid === id)
    );
  });

  const fragmentEffectFunctions = fragmentEffects.reduce((acc, effect) => {
    // Check if there are any fragmentOperatorConfigs that reference this effect
    const matchingOperatorConfig = fragmentOperatorConfigs.find((config) => {
      const { outputMapping } = config;
      const outputIds = Object.values(outputMapping).map(
        (mapping) => mapping.itemId
      );
      return outputIds.includes(effect.guid);
    });

    if (matchingOperatorConfig) {
      // Check if we already have a function config for this effect
      const existingFunctionIndex = acc.findIndex(
        (func) => func.guid === matchingOperatorConfig.guid
      );

      if (existingFunctionIndex >= 0 && acc[existingFunctionIndex]) {
        // Merge the effect into the existing function
        acc[existingFunctionIndex]?.effects?.push(effect);
      } else {
        // Create new function config with this effect
        acc.push({
          ...matchingOperatorConfig,
          effects: [effect],
        });
      }
    } else {
      // Return default effect function
      const defaultEffectFunction = {
        guid: effect.guid,
        schemaId: OPERATOR_TYPES.DEFAULT,
        effects: [effect],
        outputMapping: {},
        inputMapping: {},
      };
      acc.push(defaultEffectFunction);
    }

    return acc;
  }, [] as OperatorConfig[]);

  const vertexEffectFunctionConfigs = operatorConfigs.filter((config) => {
    const { outputMapping } = config;
    const outputIds = Object.values(outputMapping).map(
      (mapping) => mapping.itemId
    );
    return outputIds.some((id) =>
      vertexEffects.some((config) => config.guid === id)
    );
  });

  const vertexEffectFunctions = vertexEffects.reduce((acc, effect) => {
    // Check if there are any fragmentOperatorConfigs that reference this effect
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

  return {
    vertexEffects: vertexEffectFunctions,
    fragmentEffects: fragmentEffectFunctions,
    functionConfigsWithSchemas,
  };
};
