import { ExternalSchema } from "../../../types";
import { EffectConfig, SHADER_TYPES, ShaderEffectConfig } from "../../schema";
import { getShaderConfigsByType } from "../../utils";
import { SHADER_SCHEMA_TYPES } from "../../schema/consts";

export const formatEffectsAndSchemas = (
  shaderEffectConfigs: ShaderEffectConfig[],
  functionConfigs: EffectConfig[],
  externalSchemas: ExternalSchema
) => {
  const effectsWithSchemas = shaderEffectConfigs
    .map((config) =>
      mergeExternalSchema(config, config.shaderType, externalSchemas)
    )
    .filter((config) => config !== null);

  const functionConfigsWithSchemas = functionConfigs.map((config) =>
    mergeExternalSchema(config, SHADER_SCHEMA_TYPES.FUNCTION, externalSchemas)
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
  config: ShaderEffectConfig | EffectConfig,
  schemaType: string,
  externalSchemas: ExternalSchema
) => {
  const { schemaId } = config;

  const externalSchemaForEffect =
    externalSchemas[schemaType as keyof ExternalSchema]?.[schemaId];

  if (!externalSchemaForEffect) {
    console.warn(
      `External schema not found for effect ${config.guid} ${schemaType} ${schemaId}`
    );
    return null;
  }
  return {
    ...config,
    transformSchema: externalSchemaForEffect,
  };
};
