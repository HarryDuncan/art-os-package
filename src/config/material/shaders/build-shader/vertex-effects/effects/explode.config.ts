import {
  ShaderFunction,
  ParameterConfig,
  ShaderTransformationConfig,
} from "../../buildShader.types";
import {
  SHADER_VARIABLE_ASSIGNMENT_KEYS,
  SHADER_VARIABLE_TYPES,
} from "../../constants";
import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../constants/shader.consts";

export const EXPLODE_FUNCTIONS = [] as ShaderFunction[];
export const EXPLODE_ATTRIBUTES = [
  {
    id: "randomAngle",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    parameterType: SHADER_PROPERTY_TYPES.ATTRIBUTE,
    attributeConfig: {
      attributeValueType: ATTRIBUTE_VALUE_TYPES.RANDOM_VALUE,
    },
  },
  {
    id: "signDirection",
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
    id: "uStrength",
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
} as unknown as ShaderTransformationConfig;

export const EXPLODE_EFFECT_CONFIG = {
  functions: EXPLODE_FUNCTIONS,
  meshTransformConfig: [],
  parameters: EXPLODE_PARAMETERS,
  transformationConfig: [EXPLODE_TRANSFORMATION_CONFIG],
};
