import { SHADER_PROPERTY_VALUE_TYPES } from "../consts";

const DEFAULT_SPLIT_VALUE_CONFIG = {
  numSplits: 2,
  splitValues: [0.5, 0.5],
};
export const SPLIT_VALUE_OPERATOR_SCHEMA = {
  inputMapSchema: {
    evaluatedValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  valueConfig: DEFAULT_SPLIT_VALUE_CONFIG,
  outputValueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
};
