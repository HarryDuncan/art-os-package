import { SHADER_VARIABLE_ASSIGNMENT_KEYS } from "../../../generator/consts";
import {
  ShaderFunction,
  ShaderTransformationSchema,
} from "../../../generator/types";
import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_VARIABLE_TYPES,
} from "../../consts";
import { ParameterConfig } from "../../types";

export const EXPLODE_FUNCTIONS = [] as ShaderFunction[];
export const EXPLODE_ATTRIBUTES = [
  {
    key: "randomAngle",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    parameterType: SHADER_PROPERTY_TYPES.ATTRIBUTE,
    attributeConfig: {
      attributeValueType: ATTRIBUTE_VALUE_TYPES.RANDOM_VALUE,
    },
  },
  {
    key: "signDirection",
    name: "Sign Direction",
    description: "The direction of the explode effect",
    parameterType: SHADER_PROPERTY_TYPES.ATTRIBUTE,
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    attributeConfig: {
      attributeValueType: ATTRIBUTE_VALUE_TYPES.RANDOMIZED_BINARY,
    },
  },
] as ParameterConfig[];

// export const EXPLODE_VARYINGS = [
//   { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
// ] as VaryingConfig[];

export const EXPLODE_PARAMETERS = [
  {
    key: "uStrength",
    name: "Strength",
    description: "The strength of the explode effect",
    valueType: "FLOAT",
    value: 1.5,
  },
  ...EXPLODE_ATTRIBUTES,
] as ParameterConfig[];

const EXPLODE_TRANSFORMATION_CONFIG = {
  id: "explodeTransformation",
  transformCode: [
    `{{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}}.x +=  cos({{randomAngle}} * uTime) * {{uStrength}} ;`,
    `{{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}}.y +=  sin({{randomAngle}} * uTime) * {{uStrength}};`,
    `return {{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}};`,
  ],
  returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  assignedVariableId: SHADER_VARIABLE_TYPES.VERTEX_POINT,
} as unknown as ShaderTransformationSchema;

export const EXPLODE_EFFECT_CONFIG = {
  functions: EXPLODE_FUNCTIONS,
  meshTransformIds: [],
  parameters: EXPLODE_PARAMETERS,
  transformSchema: [EXPLODE_TRANSFORMATION_CONFIG],
  assignedVariableId: SHADER_VARIABLE_TYPES.VERTEX_POINT,
};
