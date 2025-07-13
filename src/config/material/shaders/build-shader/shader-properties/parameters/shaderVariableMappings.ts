import { SHADER_VARIABLE_TYPES } from "../../constants";

export const SHADER_VARIABLE_MAPPINGS = {
  [SHADER_VARIABLE_TYPES.VERTEX_POINT]: [
    "currentVertexPoint",
    "position",
    "vec4(position, 1.0)",
  ],
};
