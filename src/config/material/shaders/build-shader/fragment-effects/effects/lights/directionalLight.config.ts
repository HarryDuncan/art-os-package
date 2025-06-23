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
import {
  NORMAL_VARYING,
  VIEW_DIRECTION_VARYING,
} from "../../../constants/default-parameters/defaultVaryings";

export const DIRECTIONAL_LIGHT_PARAMETERS = [
  {
    id: "directionalLightColor",
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
    id: "directionalLightPosition",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    value: [0, 1, 0],
    configLocked: false,
    isAssetMapped: false,
    isAttribute: false,
    isUniform: true,
    isVarying: false,
  },
  {
    id: "directionalLightIntensity",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 1.0,
    configLocked: false,
    isAssetMapped: false,
    isAttribute: false,
    isUniform: true,
    isVarying: false,
  },
  {
    id: "directionalLightSpecularPower",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 32.0,
    configLocked: false,
    isAssetMapped: false,
    isAttribute: false,
    isUniform: true,
    isVarying: false,
  },
  NORMAL_VARYING,
  VIEW_DIRECTION_VARYING,
] as ParameterConfig[];

const DIRECTIONAL_LIGHT_TRANSFORMATION_CONFIG = {
  id: "directionalLightFunction",
  effectCode: [
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
} as ShaderTransformationConfig;

export const DIRECTIONAL_LIGHT_EFFECT_CONFIG = {
  functions: [],
  meshTransformConfig: [],
  parameters: DIRECTIONAL_LIGHT_PARAMETERS,
  transformationConfig: [DIRECTIONAL_LIGHT_TRANSFORMATION_CONFIG],
  assignedVariableId: SHADER_VARIABLE_TYPES.LIGHT,
};
