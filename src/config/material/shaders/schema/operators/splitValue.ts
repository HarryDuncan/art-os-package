import { SHADER_PROPERTY_VALUE_TYPES } from "../consts";

const DEFAULT_SPLIT_VALUE_CONFIG = {
  numSplits: 2,
  splitValues: [
    { key: "value1", value: 0.5 },
    { key: "value2", value: 0.5 },
  ],
};
export const SPLIT_VALUE_OPERATOR_SCHEMA = {
  inputMapSchema: {
    evaluatedValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  valueConfig: DEFAULT_SPLIT_VALUE_CONFIG,
  outputMapSchema: {
    value1: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    value2: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
};
