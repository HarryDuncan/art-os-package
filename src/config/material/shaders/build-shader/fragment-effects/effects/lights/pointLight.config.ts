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
import {
  NORMAL_VARYING,
  POSITION_VARYING,
  VIEW_DIRECTION_VARYING,
} from "../../../constants/default-parameters/defaultVaryings";

export const POINT_LIGHT_PARAMETERS = [
  {
    id: "pointLightColor",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    value: [1, 1, 1, 1],
    configLocked: false,
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
    tags: [SHADER_PROPERTY_TAGS.COLOR],
  },
  POSITION_VARYING,
  NORMAL_VARYING,
  {
    id: "lightPosition",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    value: [0, 0, 0],
    configLocked: false,
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  },
  VIEW_DIRECTION_VARYING,
  {
    id: "pointLightSpecularPower",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 32.0,
    configLocked: false,
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  },
  {
    id: "pointLightDecay",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 0.1,
    configLocked: false,
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  },
  {
    id: "pointLightIntensity",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 1.0,
    configLocked: false,
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  },
] as ParameterConfig[];

const POINT_LIGHT_TRANSFORMATION_CONFIG = {
  id: "pointLightFunction",
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
} as ShaderTransformationConfig;

export const POINT_LIGHT_EFFECT_CONFIG = {
  functions: [],
  meshTransformConfig: [],
  parameters: POINT_LIGHT_PARAMETERS,
  transformationConfig: [POINT_LIGHT_TRANSFORMATION_CONFIG],
  assignedVariableId: SHADER_VARIABLE_TYPES.LIGHT,
  outputValueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
};
