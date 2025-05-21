import { Vector3 } from "three";
import { UniformConfig } from "../../../../../../..";
import { EMPTY_UNIFORM_CONFIG } from "../../../constants/shader.consts";
import { VARYING_TYPES } from "../../../shader-properties/varyings/varyings.consts";

export const INTERACTION_BASED_REQUIRED_FUNCTIONS = [];
export const INTERACTION_BASED_UNIFORMS = EMPTY_UNIFORM_CONFIG;
export const INTERACTION_BASED_ATTRIBUTES = [];
export const INTERACTION_BASED_VARYING_CONFIG = [];

export const AFFECTED_POSITION_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [
    {
      id: "uAffectedAreaDistance",
      valueType: "FLOAT",
      value: 1.5,
      configLocked: true,
    },
  ],
  interactionMappedUniforms: [
    {
      id: "uAffectedPosition",
      valueType: "VEC3",
      value: new Vector3(0.0, 0.0, 0.0),
      configLocked: true,
    },
  ],
} as unknown as UniformConfig;

export const AFFECTED_POSITION_ATTRIBUTES = [];

export const AFFECTED_POSITION_VARYING_CONFIG = [
  {
    id: "vAffected",
    valueType: "FLOAT",
    value: 0.0,
    configLocked: true,
    varyingType: VARYING_TYPES.BINARY,
  },
];

export const AFFECTED_POSITION_EFFECT_CONFIG = {
  uniforms: AFFECTED_POSITION_UNIFORMS,
  attributes: AFFECTED_POSITION_ATTRIBUTES,
  functions: INTERACTION_BASED_REQUIRED_FUNCTIONS,
  varyings: AFFECTED_POSITION_VARYING_CONFIG,
};
