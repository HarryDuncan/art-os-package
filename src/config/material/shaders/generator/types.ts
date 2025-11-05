import {
  ParameterConfig,
  ShaderTransformationSchema,
  ShaderTransformationOutputConfig,
} from "../schema";
import { MeshTransformConfig } from "../../../config.types";

export type UniformObject = {
  [key: string]: { value: unknown } | { value: unknown }[];
};

export type ShaderParameterMap = Map<string, ShaderParameter>;
export type ShaderParameter = ParameterConfig & {
  shaderParameterId: string;
  default?: boolean;
  mappedParameterKey?: string;
};
export type ShaderTransformationConfig = ShaderTransformationSchema & {
  inputMap: ShaderParameterMap;
  functionName: string;
  functionType: string;
  dontDeclare?: boolean;
};
export type DefinedEffectFunction = {
  isSubFunction: boolean;
  key: string;
  functionType: string;
  functionName: string;
  outputConfig: ShaderTransformationOutputConfig[];
  inputMap: ShaderParameterMap;
  functionDefinition: string;
  dontDeclare?: boolean;
};
export type ShaderFunction = {
  key: string;
  functionDefinition: string;
  functionType: string;
  functionName: string;
  assignedVariableId?: string;
  functionParameters?: ShaderParameterMap;
  parameterMappingInstantiation?: Record<string, string>;
};

export type ShaderEffectSchema = {
  functions: ShaderFunction[];
  meshTransformConfig: MeshTransformConfig[];
  parameters: ParameterConfig[];
  transformSchema: ShaderTransformationSchema[];
};
export type TransformData = {
  outputConfigs: ShaderTransformationOutputConfig[];
  transformation: string[];
  requiredFunctions: ShaderFunction[];
};
