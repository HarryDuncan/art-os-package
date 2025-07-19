import { SHADER_VARIABLE_ASSIGNMENT_KEYS } from "../../../generator/consts";
import { ShaderTransformationSchema } from "../../../generator/types";
import {
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_VARIABLE_TYPES,
} from "../../consts";
import { COLOR } from "../../parameters";

const COLOR_TRANSFORMATION_CONFIG = {
  id: "defaultColorFunction",
  transformCode: [
    `{{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}} = {{defaultColor}};`,
    `return {{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}};`,
  ],
  returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  assignedVariableId: SHADER_VARIABLE_TYPES.FRAGMENT_COLOR,
} as ShaderTransformationSchema;

export const DEFAULT_COLOR = {
  functions: [],
  meshTransformIds: [],
  parameters: [COLOR],
  transformSchema: [COLOR_TRANSFORMATION_CONFIG],
  assignedVariableId: SHADER_VARIABLE_TYPES.FRAGMENT_COLOR,
};
