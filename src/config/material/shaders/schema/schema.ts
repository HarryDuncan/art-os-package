import { OPERATOR_SCHEMA_MAP } from "./operators";

export const getOperatorSchema = (schemaId?: string) => {
  const operatorSchema = OPERATOR_SCHEMA_MAP[schemaId || "DEFAULT"] || null;
  return operatorSchema;
};
