import { ExternalSchema } from "../../../types";
import { EffectConfig } from "../../schema";

export const formatEffectsAndSchemas = (
  shaderEffectConfigs: EffectConfig[],
  functionConfigs: EffectConfig[],
  animationLoopConfigs: EffectConfig[],
  externalSchemas: ExternalSchema
) => {
  const effectsWithSchemas = shaderEffectConfigs
    .filter((config) => !config.disabled)
    .map((config) => mergeExternalSchema(config, externalSchemas))
    .filter((config) => config !== null);

  const functionConfigsWithSchemas = functionConfigs
    .filter((config) => !config.disabled)
    .map((config) => mergeExternalSchema(config, externalSchemas))
    .filter((config) => config !== null);

  const animationLoopConfigsWithSchemas = animationLoopConfigs
    .filter((config) => !config.disabled)
    .map((config) => mergeExternalSchema(config, externalSchemas))
    .filter((config) => config !== null);

  return {
    effectsWithSchemas,
    functionConfigsWithSchemas: [
      ...functionConfigsWithSchemas,
      ...animationLoopConfigsWithSchemas,
    ],
  };
};

const mergeExternalSchema = (
  config: EffectConfig,
  externalSchemas: ExternalSchema
) => {
  const { schemaId } = config;

  const externalSchemaForEffect =
    externalSchemas[config.type as keyof ExternalSchema]?.[schemaId];

  if (!externalSchemaForEffect) {
    console.warn(
      `External schema not found for effect ${config.guid} ${config.type} ${schemaId}`
    );
    return null;
  }
  return {
    ...config,
    transformSchema: externalSchemaForEffect,
  };
};
