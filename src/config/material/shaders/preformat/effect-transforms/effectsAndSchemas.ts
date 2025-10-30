import { ExternalSchema } from "../../../types";
import {
  FragmentEffectConfig,
  SHADER_TYPES,
  ShaderEffectConfig,
  ShaderEffectSchema,
  ShaderTransformationSchema,
  VertexEffectConfig,
} from "../../schema";
import { getShaderConfigsByType } from "../../utils";

// const nestSubEffects = <T extends ShaderEffectConfig>(
//   effectConfigs: T[]
// ): T[] =>
//   effectConfigs.reduce((acc: T[], effect: T) => {
//     if (effect.subEffectIds && effect.subEffectIds.length > 0) {
//       const effectsReferencingThis = effectConfigs.filter((subEffect) =>
//         effect.subEffectIds?.includes(subEffect.guid)
//       );
//       if (effectsReferencingThis.length > 0) {
//         acc.push({
//           ...effect,
//           subEffects: effectsReferencingThis,
//         } as T);
//       } else {
//         acc.push(effect);
//       }
//       return acc;
//     }
//     const isSubEffect = acc.some((ef) =>
//       ef.subEffectIds?.includes(effect.guid)
//     );
//     if (isSubEffect) {
//       return acc;
//     } else {
//       acc.push(effect);
//     }
//     return acc;
//   }, [] as T[]);

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
