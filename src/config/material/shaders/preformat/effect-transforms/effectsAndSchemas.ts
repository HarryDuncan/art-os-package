import { ExternalSchema } from "../../../types";
import {
  FragmentEffectConfig,
  SHADER_TYPES,
  ShaderEffectConfig,
  VertexEffectConfig,
} from "../../schema";
import { getShaderConfigsByType } from "../../utils";

export const formatEffectsAndSchemas = (
  shaderEffectConfigs: ShaderEffectConfig[],
  externalSchemas: ExternalSchema
) => {
  const effectsWithSchemas = shaderEffectConfigs
    .map((config) => mergeExternalSchema(config, externalSchemas))
    .filter((config) => config !== null);

  const vertexEffects = getShaderConfigsByType(
    effectsWithSchemas as ShaderEffectConfig[],
    SHADER_TYPES.VERTEX
  ) as VertexEffectConfig[];

  const fragmentEffects = getShaderConfigsByType(
    effectsWithSchemas as ShaderEffectConfig[],
    SHADER_TYPES.FRAGMENT
  ) as FragmentEffectConfig[];

  // const nestedVertexEffects = nestSubEffects(vertexEffects);
  // const nestedFragmentEffects = nestSubEffects(fragmentEffects);
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
