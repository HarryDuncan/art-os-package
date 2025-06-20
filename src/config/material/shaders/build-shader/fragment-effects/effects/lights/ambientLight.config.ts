import {
  SHADER_PROPERTY_TAGS,
  ParameterConfig,
  ShaderTransformationConfig,
} from "../../../buildShader.types";
import {
  SHADER_VARIABLE_ASSIGNMENT_KEYS,
  SHADER_VARIABLE_TYPES,
} from "../../../constants";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../constants/shader.consts";

export const AMBIENT_LIGHT_PARAMETERS = [
  {
    id: "ambientLightColor",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    value: [1, 1, 1, 1],
    configLocked: false,
    isAssetMapped: false,
    isAttribute: false,
    isUniform: true,
    isVarying: false,
    tags: [SHADER_PROPERTY_TAGS.COLOR],
  },
  {
    id: "ambientLightIntensity",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 1.0,
    configLocked: false,
    isAssetMapped: false,
    isAttribute: false,
    isUniform: true,
    isVarying: false,
  },
] as ParameterConfig[];

const AMBIENT_LIGHT_TRANSFORMATION_CONFIG = {
  id: "ambientLightFunction",
  effectCode: [
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
};
