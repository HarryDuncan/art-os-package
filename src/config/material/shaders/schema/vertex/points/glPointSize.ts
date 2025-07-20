import {
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
  VARYING_TYPES,
  SHADER_VARIABLE_TYPES,
} from "../../consts";
import { ShaderTransformationSchema } from "../../types";

export const POINT_SIZE_PARAMETERS = [
  {
    key: "pointSize",
    name: "Point Size",
    description: "The size of the points",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 10,
  },
  {
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
  },
];

export const POINT_SIZE_REQUIRED_FUNCTIONS = [];

const imageToPointsTransformConfig = [
  {
    key: "getPointSize",
    transformCode: [
      `float currentPointSize = {{pointSize}};`,
      `return currentPointSize;`,
    ],
    returnValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    assignedVariableId: SHADER_VARIABLE_TYPES.GL_POINT_SIZE,
  },
] as unknown as ShaderTransformationSchema[];

export const POINT_SIZE = {
  functions: POINT_SIZE_REQUIRED_FUNCTIONS,
  meshTransformIds: [],
  parameters: POINT_SIZE_PARAMETERS,
  transformSchema: imageToPointsTransformConfig,
  assignedVariableId: SHADER_VARIABLE_TYPES.GL_POINT_SIZE,
};
