import {
  EffectConfig,
  InputMap,
  OPERATOR_TYPES,
  OperatorConfig,
  SHADER_PROPERTY_TYPES,
  SHADER_TYPES,
} from "../schema";
import { ShaderParameterMap } from "../generator/types";

export const formatOperatorConfigs = (
  shaderEffectsConfigs: EffectConfig[],
  operatorConfigs: OperatorConfig[],
  parameterMap: ShaderParameterMap
) => {
  const shaderEffectsInOperators = operatorConfigs.filter((config) => {
    const { outputMapping } = config;
    const outputIds = Object.values(outputMapping).map(
      (mapping) => mapping.itemId
    );
    return outputIds.some((id) =>
      shaderEffectsConfigs.some((config) => config.guid === id)
    );
  });

  const formattedOperatorConfigs = shaderEffectsConfigs
    .reduce((acc, effect) => {
      // Check if there are any fragmentOperatorConfigs that reference this effect
      const matchingOperatorConfig = shaderEffectsInOperators.find((config) => {
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
          type: effect.type,
        };
        acc.push(defaultEffectFunction as OperatorConfig);
      }

      return acc;
    }, [] as OperatorConfig[])
    .map((config) => {
      if (config.type === SHADER_TYPES.FRAGMENT) {
        const updatedInputMapping = Object.entries(config.inputMapping).reduce(
          (acc, [key, value]) => {
            if (value.nodeType === "parameter") {
              const attribute = parameterMap.get(key);
              if (
                attribute?.parameterType === SHADER_PROPERTY_TYPES.ATTRIBUTE
              ) {
                acc[`${key}_varying`] = value;
              } else {
                acc[key] = value;
              }
            }
            return acc;
          },
          {} as Record<string, InputMap>
        );
        return {
          ...config,
          disabled: config.effects?.some((effect) => effect.disabled),
          inputMapping: updatedInputMapping,
        };
      } else {
        return {
          ...config,
          disabled: config.effects?.some((effect) => effect.disabled),
        };
      }
    });

  return formattedOperatorConfigs;
};
