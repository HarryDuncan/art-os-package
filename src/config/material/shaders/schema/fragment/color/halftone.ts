import { SHADER_VARIABLE_ASSIGNMENT_KEYS } from "../../../generator/consts";
import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_VARIABLE_TYPES,
} from "../../consts";
import { COLOR, NORMAL_VARYING, RESOLUTION } from "../../parameters";
import { ParameterConfig, ShaderTransformationSchema } from "../../types";

export const HALFTONE_PARAMETERS = [
  NORMAL_VARYING,
  {
    key: "lightDirection",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    value: [0, 1, 0],
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  },
  RESOLUTION,
  {
    key: "halftoneRepetitions",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 10,
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  },
  COLOR,
  {
    key: "halftoneLow",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 0,
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  },
  {
    key: "halftoneHigh",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 1,
    isAssetMapped: false,
    parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  },
] as ParameterConfig[];

const HALFTONE_TRANSFORMATION_CONFIG = {
  key: "halftonePoint",
  transformCode: [
    `float intensity = dot({{vNormal}}, {{lightDirection}});`,
    `intensity = smoothstep({{halftoneLow}}, {{halftoneHigh}}, intensity);`,
    `vec2 uv = gl_FragCoord.xy / {{uResolution}}.y;`,
    `uv *= {{halftoneRepetitions}};`,
    `uv = mod(uv, 1.0);`,
    `float point = distance(uv, vec2(0.5));`,
    `point = 1.0 - step(0.5 * intensity, point);`,
    `{{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}} = mix({{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}}, {{color}}, point);`,
    `return {{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}};`,
  ],
  returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  assignedVariableId: SHADER_VARIABLE_TYPES.FRAGMENT_COLOR,
} as ShaderTransformationSchema;

export const HALFTONE = {
  functions: [],
  meshTransformIds: [],
  parameters: HALFTONE_PARAMETERS,
  transformSchema: [HALFTONE_TRANSFORMATION_CONFIG],
  assignedVariableId: SHADER_VARIABLE_TYPES.FRAGMENT_COLOR,
};
