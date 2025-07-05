import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "./constants/shader.consts";
import { VARYING_TYPES } from "./shader-properties/varyings/varyings.consts";
import { VERTEX_EFFECTS } from "./vertex-effects/vertexEffects.consts";
import { FRAGMENT_EFFECTS } from "./fragment-effects/fragmentEffects.consts";
import { SHADER_VARIABLE_TYPES } from "./constants";
import { MeshTransformConfig } from "../../../..";

// GENERAL TYPES
export type ShaderPropertyConfig = {
  id: string;
  guid: string;
  name?: string;
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  value?: unknown;
  arrayLength?: number;
  arrayValue?: unknown[];
  structProperties?: StructConfig;
  keyPointId?: string;
  effectIds?: string[];
};

export type ShaderParameterMap = Map<string, FunctionParameter>;
export type FunctionParameter = {
  id: string;
  valueType: string;
  shaderParameterId: string;
  parameterConfig?: ParameterConfig;
  default?: boolean;
  mappedParameterKey?: string;
};
export type FormattedFunctionConfig = ShaderTransformationConfig & {
  functionName: string;
  functionDependencyIds: string[];
  functionParameters: ShaderParameterMap;
  functionType: string;
  dontDeclare?: boolean;
};

export type DefinedEffectFunction = {
  id: string;
  functionType: string;
  functionName: string;
  assignedVariableId: string | undefined;
  functionParameters: ShaderParameterMap;
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

export interface EffectConfig {
  id: string;
  name?: string;
  effectParameters: ParameterConfig[];
  shaderType: string;
  subEffectIds?: string[];
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

// useful for customizing inputs - e.g color is vec4 but I want a color picker
export const SHADER_PROPERTY_TAGS = {
  COLOR: "color",
};

export type ParameterFunctionConfig = {
  functionId: string;
  outputValueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  functionInstantiationParameterMapping?: Record<string, string>;
  effectId?: string;
};
export type ParameterConfig = ShaderPropertyConfig & {
  uniqueId?: string;
  configLocked?: boolean;
  description?: string;
  isUniform?: boolean;
  isFunctionBased?: boolean;
  isAssetMapped?: boolean;
  isAttribute?: boolean;
  isVarying?: boolean;
  canSetValue?: boolean;
  isTransformInput?: boolean;
  tags?: string[];
  assetMappingConfig?: {
    assetId: string;
    relationship: string;
  };
  attributeConfig?: {
    attributeValueType: keyof typeof ATTRIBUTE_VALUE_TYPES;
    assetId: "";
    attributeCount?: number;
  };
  varyingConfig?: {
    varyingType: VaryingTypes;
    attributeKey?: string;
    activeValue?: string;
    inactiveValue?: string;
    isAttributeReference?: boolean;
  };
  functionConfig?: ParameterFunctionConfig;
};

export type StructConfig = { id: string; properties: ShaderPropertyConfig[] };
export type BuiltShaderConfig = {
  shaderEffectConfigs: ShaderEffectConfig[];
  uniformConfigs?: ParameterConfig[];
  varyingConfigs?: ParameterConfig[];
  attributeConfigs?: ParameterConfig[];
  structConfigs?: StructConfig[];
};

export type ShaderTransformationConfig = {
  id: string;
  transformCode: string[];
  returnValue: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  assignedVariableId?: keyof typeof SHADER_VARIABLE_TYPES | string;
};

export type ShaderEffectSchema = {
  functions: ShaderFunction[];
  meshTransformConfig: MeshTransformConfig[];
  parameters: ParameterConfig[];
  transformationConfig: ShaderTransformationConfig[];
};

export type AdvancedShaderVariableMap = Map<string, AdvancedShaderVariable>;
export type AdvancedShaderVariable = {
  key: string;
  instantiation: string;
  assignment: string;
};
