import { SHADER_VARIABLE_TYPES } from "../consts";

export const VERTEX_EFFECTS = {
  NONE: "NONE",
  // POINT_SIZE: "POINT_SIZE",
};

const DEFAULT_VERTEX_EFFECT = {
  functions: [],
  meshTransformIds: [],
  parameters: [],
  transformSchema: [],
  assignedVariableId: SHADER_VARIABLE_TYPES.VERTEX_POINT,
};
export const VERTEX_SCHEMA_MAP = {
  DEFAULT: DEFAULT_VERTEX_EFFECT,
};
