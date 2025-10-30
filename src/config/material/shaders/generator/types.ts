import {
  SHADER_PROPERTY_VALUE_TYPES,
  ParameterConfig,
  ShaderTransformationSchema,
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
  key: string;
  functionType: string;
  functionName: string;
  assignedVariableId: string | undefined;
  inputMap: ShaderParameterMap;
  functionDefinition: string;
  dontDeclare?: boolean;
  returnValue: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
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
  transformation: string[];
  requiredFunctions: ShaderFunction[];
  assignedVariableIds: string[] | null;
  advancedShaderVariables: AdvancedShaderVariableMap;
};
export type AdvancedShaderVariableMap = Map<string, AdvancedShaderVariable[]>;
export type AdvancedShaderVariable = {
  key: string;
  instantiation: string;
  assignment: string;
};
