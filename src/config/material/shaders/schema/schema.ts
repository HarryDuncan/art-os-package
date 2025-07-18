import { SHADER_SCHEMA_TYPES, SHADER_TYPES } from "./consts";
import { FRAGMENT_EFFECT_SCHEMA_MAP } from "./fragment";
import { FUNCTIONS_SCHEMA_MAP } from "./functions";
import { OPERATOR_SCHEMA_MAP } from "./operators";
import { VERTEX_EFFECT_SCHEMA_MAP } from "./vertex";
import { MESH_TRANSFORM_SCHEMA } from "./mesh-transforms";

export const getSchema = (schemaType: string, schemaKey?: string) => {
  switch (schemaType) {
    case SHADER_SCHEMA_TYPES.OPERATOR:
      return getOperatorSchema(schemaKey);
    case SHADER_SCHEMA_TYPES.FUNCTION:
      return getFunctionSchema(schemaKey);
    case SHADER_SCHEMA_TYPES.VERTEX:
      return getVertexSchema(schemaKey);
    case SHADER_SCHEMA_TYPES.FRAGMENT:
      return getFragmentSchema(schemaKey);
    //    case SHADER_SCHEMA_TYPES.VERTEX:
    //     return getVertexSchema(schemaId);
    //    case SHADER_SCHEMA_TYPES.FRAGMENT:
    //     return getFragmentSchema(schemaId);
    //    case SHADER_SCHEMA_TYPES.FUNCTION:
    //     return getFunctionSchema(schemaId);
  }
};

export const getOperatorSchema = (operatorId?: string) => {
  const operatorSchema = OPERATOR_SCHEMA_MAP[operatorId || "DEFAULT"] || null;
  return operatorSchema;
};

export const getFunctionSchema = (functionId?: string) => {
  const functionSchema = FUNCTIONS_SCHEMA_MAP[functionId || "DEFAULT"] || null;
  return functionSchema;
};

export const getVertexSchema = (schemaKey?: string) => {
  const vertexSchema = VERTEX_EFFECT_SCHEMA_MAP[schemaKey || "DEFAULT"] || null;
  return vertexSchema;
};

export const getFragmentSchema = (schemaKey?: string) => {
  const fragmentSchema =
    FRAGMENT_EFFECT_SCHEMA_MAP[schemaKey || "DEFAULT"] || null;
  return fragmentSchema;
};

export const getEffectSchema = (effectType: string, schemaKey?: string) => {
  return effectType === SHADER_TYPES.VERTEX
    ? getVertexSchema(schemaKey)
    : getFragmentSchema(schemaKey);
};

export const getMeshTransformSchema = (transformId?: string) => {
  const transformSchema =
    MESH_TRANSFORM_SCHEMA[transformId || "DEFAULT"] || null;
  return transformSchema;
};
