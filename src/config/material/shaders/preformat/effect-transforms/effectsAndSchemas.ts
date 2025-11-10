import { ExternalSchema } from "../../../types";
import { EffectConfig, SHADER_TYPES } from "../../schema";
import { getShaderConfigsByType } from "../../utils";

export const formatEffectsAndSchemas = (
  shaderEffectConfigs: EffectConfig[],
  functionConfigs: EffectConfig[],
  externalSchemas: ExternalSchema
) => {
  const effectsWithSchemas = shaderEffectConfigs
    .map((config) => mergeExternalSchema(config, externalSchemas))
    .filter((config) => config !== null);

  const functionConfigsWithSchemas = functionConfigs.map((config) =>
    mergeExternalSchema(config, externalSchemas)
  );

  const vertexEffects = getShaderConfigsByType(
    effectsWithSchemas,
    SHADER_TYPES.VERTEX
  );

  const fragmentEffects = getShaderConfigsByType(
    effectsWithSchemas,
    SHADER_TYPES.FRAGMENT
  );

  return {
    vertexEffects,
    fragmentEffects,
    functionConfigsWithSchemas,
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
