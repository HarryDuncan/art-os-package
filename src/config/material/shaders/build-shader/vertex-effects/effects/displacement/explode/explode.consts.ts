import {
  ShaderFunction,
  UniformConfig,
  VaryingConfig,
} from "../../../../../../../../types/materials/index";
import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../../constants/shader.consts";

export const EXPLODE_UNIFORMS = [
  { id: "uStrength", valueType: "FLOAT", value: 1.5, configLocked: true },
] as UniformConfig[];

export const EXPLODE_FUNCTIONS = [] as ShaderFunction[];
export const EXPLODE_ATTRIBUTES = [
  {
    id: "randomAngle",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    configLocked: true,
    attributeValueType: ATTRIBUTE_VALUE_TYPES.RANDOM_VALUE,
  },
  {
    id: "signDirection",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    configLocked: true,
    attributeValueType: ATTRIBUTE_VALUE_TYPES.RANDOMIZED_BINARY,
  },
];

export const EXPLODE_VARYINGS = [
  { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
] as VaryingConfig[];

export const EXPLODE_EFFECT_CONFIG = {
  uniforms: EXPLODE_UNIFORMS,
  attributes: EXPLODE_ATTRIBUTES,
  functions: EXPLODE_FUNCTIONS,
  varyings: EXPLODE_VARYINGS,
  meshTransformConfig: [],
  parameters: [],
};
