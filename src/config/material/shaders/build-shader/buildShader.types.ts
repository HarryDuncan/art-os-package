import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "./constants/shader.consts";
import { VARYING_TYPES } from "./shader-properties/varyings/varyings.consts";
import { VERTEX_EFFECTS } from "./vertex-effects/vertexEffects.consts";
import { FRAGMENT_EFFECTS } from "./fragment-effects/fragmentEffects.consts";
import { SHADER_VARIABLE_TYPES } from "./constants";
import { MeshTransformConfig } from "../../../..";

export type OutputInputMapping = {
  itemId: string;
  nodeType: string;
  type?: string;
};

export interface EffectConfig {
  id: string;
  name?: string;
  effectParameters: ParameterConfig[];
  shaderType: string;
  subEffectIds?: string[];
  inputMapping?: Record<string, OutputInputMapping>;
  outputMapping?: Record<string, OutputInputMapping>;
}
export type VertexEffectConfig = EffectConfig & {
  applyToNormal?: boolean;
  effectType: keyof typeof VERTEX_EFFECTS;
  subEffects?: VertexEffectConfig[];
};

export type FragmentEffectConfig = EffectConfig & {
  effectType: keyof typeof FRAGMENT_EFFECTS;
  subEffects?: FragmentEffectConfig[];
};

export type ShaderEffectConfig = FragmentEffectConfig | VertexEffectConfig;
// <---------------------------------------- VARYING ------------------------>
export type VaryingTypes = keyof typeof VARYING_TYPES;

// <-------------------------------------UNIFORMS ---------------------------------->

export type UniformObject = {
  [key: string]: { value: unknown } | { value: unknown }[];
};

// GENERAL TYPES
export type ShaderPropertyConfig = {
  id: string;
  guid?: string;
  name?: string;
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  value?: unknown;
  arrayLength?: number;
  arrayValue?: unknown[];
  structProperties?: StructConfig;
};

export type ParameterFunctionConfig = {
  functionId: string;
  outputValueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  inputMapping: Record<string, OutputInputMapping>;
};
export type AttributeConfig = {
  attributeValueType: keyof typeof ATTRIBUTE_VALUE_TYPES;
};

export type VaryingConfig = {
  varyingType: VaryingTypes;
  attributeKey?: string;
  activeValue?: string;
  inactiveValue?: string;
  isAttributeReference?: boolean;
};
export type ParameterConfig = ShaderPropertyConfig & {
  parameterType: keyof typeof SHADER_PROPERTY_TYPES;
  description?: string;
  isFunctionBased?: boolean;
  isAssetMapped?: boolean;
  isTransformInput?: boolean;
  tags?: string[];
  fromConfig?: boolean;
  assetMappingConfig?: {
    assetId: string;
    relationship: string;
  };
  attributeConfig?: AttributeConfig;
  varyingConfig?: VaryingConfig;
  functionConfig?: ParameterFunctionConfig;
};

export type SplitValueEditorConfig = {
  numSplits: number;
  splitValues: number[];
};

export type EffectFunctionConfig = {
  id: string;
  functionId: string;
  value?: SplitValueEditorConfig | null;
  outputMapping: Record<string, OutputInputMapping>;
  inputMapping: Record<string, OutputInputMapping> | null;
  effects: ShaderEffectConfig[];
  inputParameters?: ParameterConfig[];
};

// POST INIT TYPE
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

// useful for customizing inputs - e.g color is vec4 but I want a color picker
export const SHADER_PROPERTY_TAGS = {
  COLOR: "color",
};

export type StructConfig = { id: string; properties: ShaderPropertyConfig[] };
export type BuiltShaderConfig = {
  shaderEffectConfigs: ShaderEffectConfig[];
  effectFunctionConfigs: EffectFunctionConfig[];
  uniformConfigs?: ParameterConfig[];
  varyingConfigs?: ParameterConfig[];
  attributeConfigs?: ParameterConfig[];
  structConfigs?: StructConfig[];
  singleParameters?: ParameterConfig[];
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
  transformationConfig: ShaderTransformationSchema[];
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
