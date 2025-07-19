import { FUNCTION_SCHEMA_MAP } from "./index";

export const getFunctionTransformCode = (functionId: string) => {
  const functionConfig = FUNCTION_SCHEMA_MAP[functionId];
  if (!functionConfig) {
    console.error(`Function ${functionId} not found`);
    return [];
  }
  return functionConfig.transformCode;
};
