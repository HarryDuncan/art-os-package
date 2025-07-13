import { SHADER_PROPERTY_VALUE_TYPES } from "../../constants/shader.consts";

const DEFAULT_SPLIT_VALUE_CONFIG = {
  numSplits: 2,
  splitValues: [0.5, 0.5],
};
export const SplitValueConfig = {
  inputMapSchema: {
    evaluatedValue: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  valueConfig: DEFAULT_SPLIT_VALUE_CONFIG,
  outputValueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
};
