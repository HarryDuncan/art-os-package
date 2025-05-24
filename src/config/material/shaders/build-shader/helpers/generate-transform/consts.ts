import { SHADER_VARIABLE_TYPES } from "../../constants";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../constants/shader.consts";
import { getAssignedVariableName } from "./functions";
import { FunctionParameter } from "./types";

export const DEFAULT_VERTEX_PARAMETERS: Partial<FunctionParameter>[] = [
  {
    id: "pointPosition",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    default: true,
  },
];

export const DEFAULT_FRAGMENT_PARAMETERS: Partial<FunctionParameter>[] = [
  {
    id: "fragColor",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    default: true,
  },
];

const DISCARD_COLOR_EFFECT_CODE = {
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
