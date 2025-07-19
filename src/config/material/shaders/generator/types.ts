import {
  SHADER_VARIABLE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
  ParameterConfig,
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
  id: string;
  functionType: string;
  functionName: string;
  assignedVariableId: string | undefined;
  inputMap: ShaderParameterMap;
  functionDefinition: string;
  dontDeclare?: boolean;
  returnValue: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
};
export type ShaderFunction = {
  id: string;
  functionDefinition: string;
  functionType: string;
  functionName: string;
  assignedVariableId?: string;
  functionParameters?: ShaderParameterMap;
  parameterMappingInstantiation?: Record<string, string>;
};

export type ShaderTransformationSchema = {
  id: string;
  transformCode: string[];
  returnValue: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  assignedVariableId: keyof typeof SHADER_VARIABLE_TYPES | string;
};

export type ShaderEffectSchema = {
  functions: ShaderFunction[];
  meshTransformConfig: MeshTransformConfig[];
  parameters: ParameterConfig[];
  transformSchema: ShaderTransformationSchema[];
};
export type TransformData = {
  transformation: string;
  requiredFunctions: ShaderFunction[];
  assignedVariableId: string | null;
  advancedShaderVariables: AdvancedShaderVariableMap;
};
export type AdvancedShaderVariableMap = Map<string, AdvancedShaderVariable>;
export type AdvancedShaderVariable = {
  key: string;
  instantiation: string;
  assignment: string;
};
