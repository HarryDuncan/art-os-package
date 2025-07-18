import {
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_TAGS,
  SHADER_VARIABLE_TYPES,
} from "../../consts";
import { NORMAL_VARYING, VIEW_DIRECTION_VARYING } from "../../parameters";
import { ParameterConfig, ShaderTransformationSchema } from "../../types";

export const DIRECTIONAL_LIGHT_PARAMETERS = [
  {
    key: "directionalLightColor",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    value: [1, 1, 1, 1],
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
    tags: [SHADER_PROPERTY_TAGS.COLOR],
  },
  {
    key: "directionalLightPosition",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    value: [0, 1, 0],
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  },
  {
    key: "directionalLightIntensity",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 1.0,
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  },
  {
    key: "directionalLightSpecularPower",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 32.0,
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  },
  NORMAL_VARYING,
  VIEW_DIRECTION_VARYING,
] as ParameterConfig[];

const DIRECTIONAL_LIGHT_TRANSFORMATION_CONFIG = {
  id: "directionalLightFunction",
  transformCode: [
    `vec3 lightDirection = normalize({{directionalLightPosition}});`,
    `vec3 lightReflection = reflect(-lightDirection, {{vNormal}});`,
    `float shading = dot({{vNormal}}, lightDirection);`,
    `shading = max(0.0, shading);`,
    `float specular = -dot(lightReflection, {{vViewDirection}});`,
    `specular = max(0.0, specular);`,
    `specular = pow(specular, {{directionalLightSpecularPower}});`,
    `vec3 lightEffect = {{directionalLightColor}}.rgb * {{directionalLightIntensity}} * (shading + specular);`,
    `return lightEffect;`,
  ],
  returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  assignedVariableId: SHADER_VARIABLE_TYPES.LIGHT,
} as ShaderTransformationSchema;

export const DIRECTIONAL_LIGHT = {
  functions: [],
  meshTransformIds: [],
  parameters: DIRECTIONAL_LIGHT_PARAMETERS,
  transformationConfig: [DIRECTIONAL_LIGHT_TRANSFORMATION_CONFIG],
  assignedVariableId: SHADER_VARIABLE_TYPES.LIGHT,
};
