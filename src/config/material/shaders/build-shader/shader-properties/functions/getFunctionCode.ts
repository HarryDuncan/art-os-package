import { FUNCTIONS_SCHEMA_MAP } from ".";

export const getFunctionTransformCode = (functionId: string) => {
  const functionConfig = FUNCTIONS_SCHEMA_MAP[functionId];
  if (!functionConfig) {
    console.error(`Function ${functionId} not found`);
    return [];
  }
  return functionConfig.transformCode;
};
