import { SHADER_PROPERTY_VALUE_TYPES } from "../../constants";

const AND_FUNCTION_CONFIG = {};
export const AND_FUNCTION = {
  valueConfig: AND_FUNCTION_CONFIG,
  inputMapSchema: {
    evaluatedValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  outputMapSchema: {
    trueValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    falseValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  outputValueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
};
