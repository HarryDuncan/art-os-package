import { ShaderParameter } from "../../buildShader.types";
import {
  FUNCTION_TYPES,
  SHADER_VARIABLE_ASSIGNMENT_KEYS,
  SHADER_VARIABLE_TYPES,
} from "../../constants";
import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../constants/shader.consts";
import { FRAG_COLOR_NAME } from "../../fragment-effects/fragmentEffects.consts";
import { VERTEX_POINT_NAME } from "../../vertex-effects/vertexEffects.consts";
import { getAssignedVariableName } from "./functions";

export const DEFAULT_VERTEX_PARAMETERS: Partial<ShaderParameter>[] = [
  {
    id: "pointPosition",
    valueType:
      SHADER_PROPERTY_VALUE_TYPES.VEC4 as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
    default: true,
  },
];

export const DEFAULT_FRAGMENT_PARAMETERS: Partial<ShaderParameter>[] = [
  {
    id: "fragColor",
    valueType:
      SHADER_PROPERTY_VALUE_TYPES.VEC4 as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
    default: true,
  },
];

const DISCARD_COLOR_EFFECT_CODE = {
  key: SHADER_VARIABLE_TYPES.DISCARD_COLOR,
  instantiation: `float ${getAssignedVariableName(
    SHADER_VARIABLE_TYPES.DISCARD_COLOR
  )};`,
  assignment: `if(${getAssignedVariableName(
    SHADER_VARIABLE_TYPES.DISCARD_COLOR
  )} == 1.0){discard;}`,
};

export const ADVANCED_SHADER_VARIABLE_EFFECT_CODE = {
  [SHADER_VARIABLE_TYPES.DISCARD_COLOR]: DISCARD_COLOR_EFFECT_CODE,
};

export const DEFAULT_SHADER_VARIABLE_KEYS = {
  pointPosition: VERTEX_POINT_NAME,
  fragColor: FRAG_COLOR_NAME,
  POSITION: "vec4(position.xyz, 1.0)",
};

export const ROOT_FUNCTION_TYPES = [
  FUNCTION_TYPES.VERTEX_ROOT,
  FUNCTION_TYPES.FRAGMENT_ROOT,
];

export const DEFAULT_PARAMETER_KEY_MAP = {
  [SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT]: VERTEX_POINT_NAME,
  [SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR]: FRAG_COLOR_NAME,
  [SHADER_VARIABLE_TYPES.POSITION]: "vec4(position.xyz, 1.0)",
  // [SHADER_VARIABLE_ASSIGNMENT_KEYS.DISCARD_COLOR]: DISCARD_COLOR_EFFECT_CODE,
  // [SHADER_VARIABLE_ASSIGNMENT_KEYS.GL_POINT_SIZE]: "gl_PointSize",
};

export const DEFAULT_PARAMETER_KEYS = [
  SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT,
  SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR,
  SHADER_VARIABLE_TYPES.POSITION,
];

export const ROOT_ASSIGNED_VARIABLES = [
  SHADER_VARIABLE_TYPES.GL_POINT_SIZE,
  SHADER_VARIABLE_TYPES.DISCARD_COLOR,
];

export const GLOBAL_PARAMETER_TYPES = [
  SHADER_PROPERTY_TYPES.UNIFORM,
  SHADER_PROPERTY_TYPES.VARYING,
  SHADER_PROPERTY_TYPES.ATTRIBUTE,
];
