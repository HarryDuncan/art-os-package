import {
  FragmentEffectConfig,
  getEffectSchema,
  SHADER_TYPES,
  SHADER_VARIABLE_TYPES,
  ShaderEffectConfig,
  ShaderEffectSchema,
  VertexEffectConfig,
} from "../../schema";
import { getShaderConfigsByType } from "../../utils";

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

export const formatEffectsAndSchemas = (
  shaderEffectConfigs: ShaderEffectConfig[],
  externalSchemas: Record<string, Record<string, unknown>> = {}
) => {
  const effectsWithSchemas = shaderEffectConfigs.map((config) =>
    mergeExternalSchema(config, externalSchemas)
  );
  const vertexEffects = getShaderConfigsByType(
    effectsWithSchemas as ShaderEffectConfig[],
    SHADER_TYPES.VERTEX
  ) as VertexEffectConfig[];

  const fragmentEffects = getShaderConfigsByType(
    effectsWithSchemas as ShaderEffectConfig[],
    SHADER_TYPES.FRAGMENT
  ) as FragmentEffectConfig[];

  const nestedVertexEffects = nestSubEffects(vertexEffects);
  const nestedFragmentEffects = nestSubEffects(fragmentEffects);
  return {
    vertexEffects: nestedVertexEffects,
    fragmentEffects: nestedFragmentEffects,
  };
};

const mergeExternalSchema = (
  config: ShaderEffectConfig,
  externalSchemas: Record<string, Record<string, unknown>>
) => {
  const { schemaId, shaderType } = config;

  const externalSchemaForEffect = externalSchemas[shaderType]?.[schemaId];

  if (!externalSchemaForEffect) {
    const effectSchema = getEffectSchema(shaderType, schemaId);
    return {
      ...config,
      effectSchema: effectSchema ?? ({} as ShaderEffectSchema),
    };
  } else {
    const formattedExternalSchema = formatExternalSchema(
      externalSchemaForEffect,
      shaderType
    );
    return {
      ...config,
      effectSchema: formattedExternalSchema as ShaderEffectSchema,
    };
  }
};

const ALLOWED_ASSIGNED_VARIABLE_IDS = [
  SHADER_VARIABLE_TYPES.FRAGMENT_COLOR,
  SHADER_VARIABLE_TYPES.LIGHT,
  SHADER_VARIABLE_TYPES.POST_EFFECT,
];
const getAssignedVariableId = (shaderType: string, externalSchema: unknown) => {
  if (
    ALLOWED_ASSIGNED_VARIABLE_IDS.includes(
      (externalSchema as ShaderEffectSchema).transformSchema[0]
        .assignedVariableId as string
    )
  ) {
    return (externalSchema as ShaderEffectSchema).transformSchema[0]
      .assignedVariableId as string;
  }
  return shaderType === SHADER_TYPES.VERTEX
    ? SHADER_VARIABLE_TYPES.VERTEX_POINT
    : SHADER_VARIABLE_TYPES.FRAGMENT_COLOR;
};
/* 
 TODO - format external schema on the art os side
*/
const formatExternalSchema = (externalSchema: unknown, shaderType: string) => {
  const assignedVariableId = getAssignedVariableId(shaderType, externalSchema);

  return {
    ...(externalSchema as ShaderEffectSchema),
    transformSchema: (externalSchema as ShaderEffectSchema).transformSchema,
    assignedVariableId,
  };
};
