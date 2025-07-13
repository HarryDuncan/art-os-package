import { SplitValueConfig } from "./schema/splitValue";
import { AND_FUNCTION } from "./schema/andFunction";

export const EFFECT_FUNCTIONS = {
  SPLIT_VALUE: "split value",
  AND_FUNCTION: "and function",
  DEFAULT: "default",
};

export const EFFECT_FUNCTION_MAP = {
  [EFFECT_FUNCTIONS.SPLIT_VALUE]: SplitValueConfig,
  [EFFECT_FUNCTIONS.AND_FUNCTION]: AND_FUNCTION,
};

export const getEffectFunctionSchema = (effectFunctionId: string) => {
  const effectFunctionSchema = EFFECT_FUNCTION_MAP[effectFunctionId];
  if (!effectFunctionSchema) {
    console.error(
      `Effect function schema not found for id: ${effectFunctionId}`
    );
    return null;
  }
  return effectFunctionSchema;
};
