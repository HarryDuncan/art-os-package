import { SHADER_SCHEMA_TYPES, SHADER_TYPES } from "./consts";
import { FRAGMENT_SCHEMA_MAP } from "./fragment";

import { OPERATOR_SCHEMA_MAP } from "./operators";
import { VERTEX_SCHEMA_MAP } from "./vertex";
import { MESH_TRANSFORM_SCHEMA } from "./mesh-transforms";
import { VERTEX_POINT, TIME, FRAGMENT_COLOR, NORMAL } from "./parameters";

export const getSchema = (schemaType: string, schemaId?: string) => {
  switch (schemaType) {
    case SHADER_SCHEMA_TYPES.OPERATOR:
      return getOperatorSchema(schemaId);

    case SHADER_SCHEMA_TYPES.VERTEX:
      return getVertexSchema();
    case SHADER_SCHEMA_TYPES.FRAGMENT:
      return getFragmentSchema();
    case SHADER_SCHEMA_TYPES.MESH_TRANSFORM:
      return getMeshTransformSchema(schemaId);

    //    case SHADER_SCHEMA_TYPES.VERTEX:
    //     return getVertexSchema(schemaId);
    //    case SHADER_SCHEMA_TYPES.FRAGMENT:
    //     return getFragmentSchema(schemaId);
    //    case SHADER_SCHEMA_TYPES.FUNCTION:
    //     return getFunctionSchema(schemaId);
  }
};

export const getOperatorSchema = (schemaId?: string) => {
  const operatorSchema = OPERATOR_SCHEMA_MAP[schemaId || "DEFAULT"] || null;
  return operatorSchema;
};

export const getVertexSchema = () => {
  const vertexSchema = VERTEX_SCHEMA_MAP["DEFAULT"] || null;
  return vertexSchema;
};

export const getFragmentSchema = () => {
  const fragmentSchema = FRAGMENT_SCHEMA_MAP["DEFAULT"] || null;
  return fragmentSchema;
};

export const getEffectSchema = (effectType: string) => {
  return effectType === SHADER_TYPES.VERTEX
    ? getVertexSchema()
    : getFragmentSchema();
};

export const getMeshTransformSchema = (transformKey?: string) => {
  const transformSchema =
    MESH_TRANSFORM_SCHEMA[transformKey as keyof typeof MESH_TRANSFORM_SCHEMA] ||
    null;
  return transformSchema;
};

export const getDefaultSchemaParameters = (schemaType: string) => {
  switch (schemaType) {
    // case SHADER_SCHEMA_TYPES.OPERATOR:
    //   return getOperatorSchema();
    // case SHADER_SCHEMA_TYPES.FUNCTION:
    //   return getFunctionSchema();
    case SHADER_SCHEMA_TYPES.VERTEX:
      return [TIME, VERTEX_POINT, NORMAL];
    case SHADER_SCHEMA_TYPES.FRAGMENT:
      return [TIME, FRAGMENT_COLOR];
    default:
      return [];
  }
};
