import {
  EffectFunctionConfig,
  ParameterConfig,
  ShaderEffectConfig,
  VertexEffectConfig,
} from "../buildShader.types";
import { FragmentEffectConfig } from "../buildShader.types";
import { SHADER_TYPES } from "../constants";
import { EFFECT_FUNCTIONS } from "../effect-functions";

export const formatShaderEffects = (
  shaderEffectConfigs: ShaderEffectConfig[],
  effectFunctionConfigs: EffectFunctionConfig[],
  singleParameters: ParameterConfig[]
) => {
  console.log("effectFunctionConfigs", effectFunctionConfigs);
  const vertexEffectConfigs = shaderEffectConfigs.filter(
    (config) => config.shaderType === SHADER_TYPES.VERTEX
  ) as VertexEffectConfig[];
  const fragmentEffectConfigs = shaderEffectConfigs.filter(
    (config) => config.shaderType === SHADER_TYPES.FRAGMENT
  ) as FragmentEffectConfig[];

  const fragmentEffectFunctionConfigs = effectFunctionConfigs.flatMap(
    (config) => {
      const { outputMapping } = config;
      const outputIds = Object.values(outputMapping).map(
        (mapping) => mapping.itemId
      );
      const isFragmentEffect = outputIds.some((id) =>
        fragmentEffectConfigs.some((config) => config.id === id)
      );
      if (isFragmentEffect) {
        const inputIds = Object.values(config.inputMapping ?? {}).map(
          (mapping) => mapping.itemId
        );
        const inputParameters = singleParameters.filter((parameter) =>
          inputIds.includes(parameter.guid ?? "")
        );
        return { ...config, inputParameters };
      }
      return [];
    }
  );

  // const vertexEffectFunctionConfigs = effectFunctionConfigs.filter(
  //   (config) => {
  //     const { outputMapping } = config;
  //     const outputIds = Object.values(outputMapping).map((mapping) => mapping.itemId);
  //     const isVertexEffect = outputIds.some((id) =>
  //       vertexEffectConfigs.some((config) => config.id === id)
  //     );
  //     return isVertexEffect;
  //   }
  // );

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

  const fragmentEffectFunctions = formattedFragmentEffects.reduce(
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
  console.log("fragmentEffectFunctions", fragmentEffectFunctions);
  return {
    vertexEffectFunctions,
    fragmentEffectFunctions,
  };
};
