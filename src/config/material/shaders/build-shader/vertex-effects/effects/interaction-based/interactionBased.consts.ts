import { Vector3 } from "three";
import { VARYING_TYPES } from "../../../shader-properties/varyings/varyings.consts";
import { UniformConfig } from "../../../buildShader.types";

export const INTERACTION_BASED_REQUIRED_FUNCTIONS = [];
export const INTERACTION_BASED_UNIFORMS = [] as UniformConfig[];
export const INTERACTION_BASED_ATTRIBUTES = [];
export const INTERACTION_BASED_VARYING_CONFIG = [];

export const AFFECTED_POSITION_UNIFORMS = [
  {
    id: "uAffectedAreaDistance",
    valueType: "FLOAT",
    value: 1.5,
    configLocked: true,
  },
  {
    id: "uAffectedPosition",
    valueType: "VEC3",
    value: new Vector3(0.0, 0.0, 0.0),
    configLocked: true,
    interactionConfig: {
      keyPointId: null,
    },
  },
] as UniformConfig[];

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
  meshTransformConfig: [],
  parameters: [],
};
