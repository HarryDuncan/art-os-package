import { SHADER_PROPERTY_VALUE_TYPES } from "../consts";

const DEFAULT_SPLIT_VALUE_CONFIG = {
  numSplits: 2,
};
export const SPLIT_VALUE_OPERATOR_SCHEMA = {
  inputMapSchema: {
    evaluatedValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  valueConfig: DEFAULT_SPLIT_VALUE_CONFIG,
  value: { split1: 0.5, split2: 0.5 },
  outputMapSchema: {
    split1: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    split2: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
};
