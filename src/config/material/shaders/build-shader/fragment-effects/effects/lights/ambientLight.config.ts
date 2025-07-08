import {
  SHADER_PROPERTY_TAGS,
  ParameterConfig,
  ShaderTransformationConfig,
} from "../../../buildShader.types";
import { SHADER_VARIABLE_TYPES } from "../../../constants";
import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../constants/shader.consts";

export const AMBIENT_LIGHT_PARAMETERS = [
  {
    id: "ambientLightColor",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    value: [1, 1, 1, 1],
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
    tags: [SHADER_PROPERTY_TAGS.COLOR],
  },
  {
    id: "ambientLightIntensity",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 1.0,
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  },
] as ParameterConfig[];

const AMBIENT_LIGHT_TRANSFORMATION_CONFIG = {
  id: "ambientLightFunction",
  transformCode: [
    `vec3 lightEffect = {{ambientLightColor}}.rgb * {{ambientLightIntensity}};`,
    `return lightEffect;`,
  ],
  returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  assignedVariableId: SHADER_VARIABLE_TYPES.LIGHT,
} as ShaderTransformationConfig;

export const AMBIENT_LIGHT_EFFECT_CONFIG = {
  functions: [],
  meshTransformConfig: [],
  parameters: AMBIENT_LIGHT_PARAMETERS,
  transformationConfig: [AMBIENT_LIGHT_TRANSFORMATION_CONFIG],
  assignedVariableId: SHADER_VARIABLE_TYPES.LIGHT,
  outputValueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
};
