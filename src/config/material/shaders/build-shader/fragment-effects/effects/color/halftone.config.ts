import {
  ParameterConfig,
  SHADER_PROPERTY_TAGS,
  ShaderTransformationConfig,
} from "../../../buildShader.types";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../constants/shader.consts";
import {
  SHADER_VARIABLE_ASSIGNMENT_KEYS,
  SHADER_VARIABLE_TYPES,
} from "../../../constants";
import { NORMAL_VARYING, RESOLUTION_UNIFORM } from "../../../constants";

export const HALFTONE_PARAMETERS = [
  NORMAL_VARYING,
  {
    id: "lightDirection",
    valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
    value: [0, 1, 0],
    configLocked: false,
    isAssetMapped: false,
    isAttribute: false,
    isUniform: true,
    isVarying: false,
  },
  RESOLUTION_UNIFORM,
  {
    id: "halftoneRepetitions",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 10,
    configLocked: false,
    isAssetMapped: false,
    isAttribute: false,
    isUniform: true,
    isVarying: false,
  },
  {
    id: "halftoneColor",
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
    id: "halftoneLow",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 0,
    configLocked: false,
    isAssetMapped: false,
    isAttribute: false,
    isUniform: true,
    isVarying: false,
  },
  {
    id: "halftoneHigh",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value: 1,
    configLocked: false,
    isAssetMapped: false,
    isAttribute: false,
    isUniform: true,
    isVarying: false,
  },
] as ParameterConfig[];

const HALFTONE_TRANSFORMATION_CONFIG = {
  id: "halftonePoint",
  transformCode: [
    `float intensity = dot({{vNormal}}, {{lightDirection}});`,
    `intensity = smoothstep({{halftoneLow}}, {{halftoneHigh}}, intensity);`,
    `vec2 uv = gl_FragCoord.xy / {{uResolution}}.y;`,
    `uv *= {{halftoneRepetitions}};`,
    `uv = mod(uv, 1.0);`,
    `float point = distance(uv, vec2(0.5));`,
    `point = 1.0 - step(0.5 * intensity, point);`,
    `{{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}} = mix({{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}}, {{halftoneColor}}, point);`,
    `return {{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}};`,
  ],
  returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  assignedVariableId: SHADER_VARIABLE_TYPES.FRAGMENT_COLOR,
} as ShaderTransformationConfig;

export const HALFTONE_EFFECT_CONFIG = {
  functions: [],
  meshTransformConfig: [],
  parameters: HALFTONE_PARAMETERS,
  transformationConfig: [HALFTONE_TRANSFORMATION_CONFIG],
  outputValueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
};
