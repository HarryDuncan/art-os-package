import {
  ParameterConfig,
  SHADER_PROPERTY_TAGS,
  ShaderTransformationConfig,
} from "../../buildShader.types";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../constants/shader.consts";
import {
  SHADER_VARIABLE_ASSIGNMENT_KEYS,
  SHADER_VARIABLE_TYPES,
} from "../../constants";

export const DEFAULT_COLOR_PARAMETERS = [
  {
    id: "defaultColor",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    value: [0, 0, 0, 1],
    configLocked: false,
    isAssetMapped: false,
    isAttribute: false,
    isUniform: false,
    isVarying: false,
    tags: [SHADER_PROPERTY_TAGS.COLOR],
  },
] as ParameterConfig[];

const COLOR_TRANSFORMATION_CONFIG = {
  id: "defaultColorFunction",
  effectCode: [
    `{{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}} = {{defaultColor}};`,
    `return {{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}};`,
  ],
  returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  assignedVariableId: SHADER_VARIABLE_TYPES.FRAGMENT_COLOR,
} as ShaderTransformationConfig;

export const DEFAULT_COLOR_EFFECT_CONFIG = {
  functions: [],
  meshTransformConfig: [],
  parameters: DEFAULT_COLOR_PARAMETERS,
  transformationConfig: [COLOR_TRANSFORMATION_CONFIG],
};
