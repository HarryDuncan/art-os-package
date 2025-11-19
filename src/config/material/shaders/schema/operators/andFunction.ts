import { SHADER_PROPERTY_VALUE_TYPES } from "../consts";

export const AND_OPERATOR_SCHEMA = {
  valueConfig: {},
  value: {
    trueValue: 1,
    falseValue: 0,
  },
  inputMapSchema: {
    evaluatedValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  outputMapSchema: {
    trueValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    falseValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  outputValueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
};
