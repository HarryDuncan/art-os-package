import {
  ParameterConfig,
  ShaderTransformationConfig,
} from "../../buildShader.types";
import {
  SHADER_VARIABLE_ASSIGNMENT_KEYS,
  SHADER_VARIABLE_TYPES,
} from "../../constants";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../constants/shader.consts";
import { VARYING_TYPES } from "../../shader-properties/varyings/varyings.consts";

export const AFFECTED_POSITION_PARAMETERS = [
  {
    id: "vIsAffected",
    name: "Is Affected",
    description: "The position of the affected area",
    value: null,
    configLocked: true,
    isAssetMapped: false,
    isAttribute: false,
    isUniform: false,
    isVarying: true,
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    varyingConfig: {
      varyingType: VARYING_TYPES.FUNCTION,
    },
    functionId: "isPositionAffected",
    functionInstantiationParameterMapping: {
      [SHADER_VARIABLE_ASSIGNMENT_KEYS.VERTEX_POINT]:
        SHADER_VARIABLE_TYPES.POSITION,
    },
  },
] as unknown as ParameterConfig[];

export const AFFECTED_POSITION_ATTRIBUTES = [];

export const affectedPositionTransformConfig = [
  {
    id: "affectedPositionVarying",
    effectCode: [
      `if({{vIsAffected}} == 1.0){`,
      `{{SUB_EFFECTS}}`,
      `}`,
      `return {{${SHADER_VARIABLE_ASSIGNMENT_KEYS.FRAGMENT_COLOR}}};`,
    ],
    returnValue: SHADER_PROPERTY_VALUE_TYPES.VEC4,
    assignedVariableId: SHADER_VARIABLE_TYPES.FRAGMENT_COLOR,
  },
] as unknown as ShaderTransformationConfig[];

export const AFFECTED_POSITION_EFFECT_FRAGMENT_CONFIG = {
  functions: [],
  meshTransformConfig: [],
  parameters: AFFECTED_POSITION_PARAMETERS,
  transformationConfig: affectedPositionTransformConfig,
};
