import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_VARIABLE_TYPES,
} from "../../../constants";
import { VARYING_TYPES } from "../../varyings/varyings.consts";

export const VERTEX_POINT = {
  key: "pointPosition",
  name: "Current Vertex Point",
  description:
    "The current vertex point - can be mapped to the current position or te original position of the mesh",
  parameterType: SHADER_PROPERTY_TYPES.SHADER_VARIABLE,
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  shaderVariableConfig: {
    shaderVariableType: SHADER_VARIABLE_TYPES.VERTEX_POINT,
  },
};

export const UV = {
  key: "vUv",
  name: "UV",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
  description: "The UV coordinates of the texture",
  parameterType: SHADER_PROPERTY_TYPES.VARYING,
  varyingConfig: {
    varyingType: VARYING_TYPES.DEFAULT,
    attributeKey: "uv",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
  },
};
