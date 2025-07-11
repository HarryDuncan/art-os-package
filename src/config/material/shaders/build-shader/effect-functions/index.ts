import { SplitValueConfig } from "./configs/SplitValueConfig";

export const EFFECT_FUNCTIONS = {
  SPLIT_VALUE: "split value",
  BINARY_RESULT: "binary result",
  DEFAULT: "default",
};

export const EFFECT_FUNCTION_MAP = {
  [EFFECT_FUNCTIONS.SPLIT_VALUE]: SplitValueConfig,
};
