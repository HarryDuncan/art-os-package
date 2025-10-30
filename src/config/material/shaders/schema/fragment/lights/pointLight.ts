import {
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_TAGS,
  SHADER_VARIABLE_TYPES,
} from "../../consts";
import {
  POSITION_VARYING,
  NORMAL_VARYING,
  VIEW_DIRECTION_VARYING,
} from "../../parameters";
import { ParameterConfig, ShaderTransformationSchema } from "../../types";

export const POINT_LIGHT_PARAMETERS = [
  {
    key: "pointLightColor",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    value: [1, 1, 1, 1],
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
    tags: [SHADER_PROPERTY_TAGS.COLOR],
  },
  POSITION_VARYING,
  NORMAL_VARYING,
  {
    key: "lightPosition",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    value: [0, 0, 0],
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  },
  VIEW_DIRECTION_VARYING,
  {
    key: "pointLightSpecularPower",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 32.0,
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  },
  {
    key: "pointLightDecay",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 0.1,
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  },
  {
    key: "pointLightIntensity",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 1.0,
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  },
] as ParameterConfig[];

const POINT_LIGHT_TRANSFORMATION_CONFIG = {
  key: "pointLightFunction",
  transformCode: [
    `vec3 lightDelta = {{lightPosition}} - {{vPosition}}.xyz;`,
    `float lightDistance = length(lightDelta);`,
    `vec3 lightDirection = normalize(lightDelta);`,
    `vec3 lightReflection = reflect(-lightDirection, {{vNormal}});`,

    `// Shading`,
    `float shading = dot({{vNormal}}, lightDirection);`,
    `shading = max(0.0, shading);`,

    `// Specular`,
    `float specular = -dot(lightReflection, {{vViewDirection}});`,
    `specular = max(0.0, specular);`,
    `specular = pow(specular, {{pointLightSpecularPower}});`,

    `// Decay`,
    `float decay = 1.0 - lightDistance * {{pointLightDecay}};`,
    `decay = max(0.0, decay);`,

    `vec3 lightEffect = {{pointLightColor}}.rgb * {{pointLightIntensity}} * decay * (shading + specular);`,
    `return lightEffect;`,
  ],
  returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  assignedVariableId: SHADER_VARIABLE_TYPES.LIGHT,
} as unknown as ShaderTransformationSchema;

export const POINT_LIGHT = {
  functions: [],
  meshTransformIds: [],
  parameters: POINT_LIGHT_PARAMETERS,
  transformSchema: [POINT_LIGHT_TRANSFORMATION_CONFIG],
  assignedVariableId: SHADER_VARIABLE_TYPES.LIGHT,
};
