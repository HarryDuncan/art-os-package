import { ExternalSchema } from "../../../types";
import { SHADER_TYPES, ShaderEffectConfig } from "../../schema";
import { getShaderConfigsByType } from "../../utils";

export const formatEffectsAndSchemas = (
  shaderEffectConfigs: ShaderEffectConfig[],
  externalSchemas: ExternalSchema
) => {
  const effectsWithSchemas = shaderEffectConfigs
    .map((config) => mergeExternalSchema(config, externalSchemas))
    .filter((config) => config !== null);

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
  };
};

const mergeExternalSchema = (
  config: ShaderEffectConfig,
  externalSchemas: ExternalSchema
) => {
  const { schemaId, shaderType } = config;

  const externalSchemaForEffect = externalSchemas[shaderType]?.[schemaId];

  if (!externalSchemaForEffect) {
    console.warn(
      `External schema not found for effect ${config.guid} ${shaderType} ${schemaId}`
    );
    return null;
  }
  return {
    ...config,
    effectSchemas: externalSchemaForEffect,
  };
};
