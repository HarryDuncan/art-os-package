import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../constants";

export const AFFECTED_POSITION = {
  key: "affectedPosition",
  name: "Affected Position",
  description:
    "The position of an effect - normally maps to a key point from an interaction",
  parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
  value: [0, 0],
};

export const AFFECTED_AREA_DISTANCE = {
  key: "affectedAreaDistance",
  name: "Affected Area Distance",
  description:
    "The distance from the affected position that the effect will be applied",
  parameterType: SHADER_PROPERTY_TYPES.UNIFORM,
  valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  value: 50,
};
