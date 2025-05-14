import { Vector3 } from "three";
import { UniformConfig } from "../../../../../../..";
import {
  ATTRIBUTE_VALUE_TYPES,
  EMPTY_UNIFORM_CONFIG,
} from "../../../constants/shader.consts";

export const INTERACTION_BASED_REQUIRED_FUNCTIONS = [];
export const INTERACTION_BASED_UNIFORMS = EMPTY_UNIFORM_CONFIG;
export const INTERACTION_BASED_ATTRIBUTES = [];
export const INTERACTION_BASED_VARYING_CONFIG = [];

export const AFFECTED_POSITION_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [],
  interactionMappedUniforms: [
    {
      id: "uAffectedPosition",
      valueType: "VEC3",
      value: new Vector3(0.0, 0.0, 0.0),
      configLocked: true,
    },
  ],
} as unknown as UniformConfig;

export const AFFECTED_POSITION_ATTRIBUTES = [
  {
    id: "effectedAreaDistance",
    valueType: "FLOAT",
    value: 1.5,
    configLocked: true,
    attributeValueType: ATTRIBUTE_VALUE_TYPES.SINGLE_VALUE,
  },
  {
    id: "effectStrength",
    valueType: "FLOAT",
    value: 1.5,
    configLocked: true,
    attributeValueType: ATTRIBUTE_VALUE_TYPES.SINGLE_VALUE,
  },
];
