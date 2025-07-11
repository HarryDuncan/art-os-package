import {
  ParameterConfig,
  ShaderTransformationSchema,
} from "../../buildShader.types";
import {
  SHADER_VARIABLE_ASSIGNMENT_KEYS,
  SHADER_VARIABLE_TYPES,
} from "../../constants";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../constants/shader.consts";

const ROTATION_EFFECT_PARAMETERS = [
  {
    id: "rotationSpeed",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 1.0,
  },
  {
    id: "rotationAxis",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    value: [0, 1, 0],
  },
] as ParameterConfig[];

const ROTATION_EFFECT_TRANSFORMATION = [
  {
    id: "rotationTransformation",
    transformCode: [
      `float angle = uTime * {{rotationSpeed}};`,
      `float c = cos(angle);`,
      `float s = sin(angle);`,
      `float oc = 1.0 - c;`,

      `mat3 rotation = mat3(
        oc * {{rotationAxis}}.x * {{rotationAxis}}.x + c,
        oc * {{rotationAxis}}.x * {{rotationAxis}}.y - {{rotationAxis}}.z * s,
        oc * {{rotationAxis}}.z * {{rotationAxis}}.x + {{rotationAxis}}.y * s,

        oc * {{rotationAxis}}.x * {{rotationAxis}}.y + {{rotationAxis}}.z * s,
        oc * {{rotationAxis}}.y * {{rotationAxis}}.y + c,
        oc * {{rotationAxis}}.y * {{rotationAxis}}.z - {{rotationAxis}}.x * s,

        oc * {{rotationAxis}}.z * {{rotationAxis}}.x - {{rotationAxis}}.y * s,
        oc * {{rotationAxis}}.y * {{rotationAxis}}.z + {{rotationAxis}}.x * s,
        oc * {{rotationAxis}}.z * {{rotationAxis}}.z + c
      );`,

      `vec3 rotated = rotation * {{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}}.xyz;`,
      `{{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}} = vec4(rotated, {{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}}.w);`,
      `return {{${SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT}}};`,
    ],
    returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    assignedVariableId: SHADER_VARIABLE_TYPES.VERTEX_POINT,
  },
] as unknown as ShaderTransformationSchema[];

// const ROTATION_VARYINGS = [
//   { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
// ] as VaryingConfig[];
export const ROTATION_EFFECT_CONFIG = {
  functions: [],
  meshTransformConfig: [],
  parameters: ROTATION_EFFECT_PARAMETERS,
  transformationConfig: ROTATION_EFFECT_TRANSFORMATION,
};
