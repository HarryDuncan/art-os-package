import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../constants";

export const VERTEX_POINT = {
  id: "pointPosition",
  name: "Current Vertex Point",
  description:
    "The current vertex point - can be mapped to the current position or te original position of the mesh",
  parameterType: SHADER_PROPERTY_TYPES.SHADER_VARIABLE,
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
};
