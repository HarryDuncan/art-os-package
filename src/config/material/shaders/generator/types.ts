import { ParameterConfig, ShaderTransformationOutputConfig } from "../schema";

export type UniformObject = {
  [key: string]: { value: unknown } | { value: unknown }[];
};

export type ShaderParameterMap = Map<string, ParameterConfig>;

export type TransformDefinition = {
  id: string;
  functionName: string;
  definitionCode: string[];
  transformType: string;
};
export type ConfiguredTransform = {
  transformAssignments: string[];
  outputConfigs: ShaderTransformationOutputConfig[];
  transformDefinitions: TransformDefinition[];
};

export type AssignmentConfig = {
  parameterKey: string;
  assignmentValue?: string;
};
