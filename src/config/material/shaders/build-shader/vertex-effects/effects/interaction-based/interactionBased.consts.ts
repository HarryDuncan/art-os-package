import { Vector3 } from "three";
import { VARYING_TYPES } from "../../../shader-properties/varyings/varyings.consts";
import { ParameterConfig } from "../../../../../../..";

export const INTERACTION_BASED_REQUIRED_FUNCTIONS = [];
export const INTERACTION_BASED_UNIFORMS = [] as ParameterConfig[];
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
] as ParameterConfig[];

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
  functions: INTERACTION_BASED_REQUIRED_FUNCTIONS,
  meshTransformConfig: [],
  parameters: [],
  transformationConfig: [],
};
