import { SHADER_VARIABLE_TYPES } from "../consts";

export const SHADER_VARIABLE_MAPPINGS = {
  [SHADER_VARIABLE_TYPES.VERTEX_POINT]: [
    "currentVertexPoint",
    "vec4(position, 1.0)",
  ],
};
