import { SHADER_PROPERTY_VALUE_TYPES } from "../consts";

export const DEFAULT_SEQUENCE_CONFIG = {
  numSequences: 2,
  sequenceBounds: [
    { key: "value1", lowerBound: 0, upperBound: 1 },
    { key: "value2", lowerBound: 0, upperBound: 1 },
  ],
  outputAsPercentage: false,
};

export const SEQUENCE_OPERATOR_SCHEMA = {
  inputMapSchema: {
    evaluatedValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  valueConfig: DEFAULT_SEQUENCE_CONFIG,
  outputConfig: {
    asPercentage: false,
  },
  outputValueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
};
