import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../constants/shader.consts";
import { VARYING_TYPES } from "../../../shader-properties/varyings/varyings.consts";
import { SHADER_VARIABLE_TYPES } from "../../../constants";
import { ShaderTransformationSchema } from "../../../buildShader.types";

export const POINT_SIZE_PARAMETERS = [
  {
    id: "pointSize",
    name: "Point Size",
    description: "The size of the points",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 10,
  },
  {
    id: "vUv",
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
    id: "getPointSize",
    transformCode: [
      `float currentPointSize = {{pointSize}};`,
      `return currentPointSize;`,
    ],
    returnValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    assignedVariableId: SHADER_VARIABLE_TYPES.GL_POINT_SIZE,
  },
] as unknown as ShaderTransformationSchema[];

export const POINT_SIZE_EFFECT_CONFIG = {
  functions: POINT_SIZE_REQUIRED_FUNCTIONS,
  meshTransformConfig: [],
  parameters: POINT_SIZE_PARAMETERS,
  transformationConfig: imageToPointsTransformConfig,
  assignedVariableId: SHADER_VARIABLE_TYPES.GL_POINT_SIZE,
};
