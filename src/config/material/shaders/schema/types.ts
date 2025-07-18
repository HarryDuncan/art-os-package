import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_VARIABLE_TYPES,
  VARYING_TYPES,
} from "./consts";
import { FRAGMENT_EFFECTS } from "./fragment";
import { VERTEX_EFFECTS } from "./vertex";

export type OutputInputMapping = {
  itemId: string;
  nodeType: string;
  type?: string;
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
  varyingType: keyof typeof VARYING_TYPES;
  attributeKey?: string;
  activeValue?: string;
  inactiveValue?: string;
  isAttributeReference?: boolean;
};
export type ShaderVariableConfig = {
  shaderVariableType: keyof typeof SHADER_VARIABLE_TYPES;
  mappedVariableId?: string;
};

export type ParameterConfig = {
  key: string;
  guid: string;
  name?: string;
  description?: string;
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  value?: unknown;
  arrayLength?: number;
  arrayValue?: unknown[];
  parameterType: keyof typeof SHADER_PROPERTY_TYPES;
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
  shaderVariableConfig?: ShaderVariableConfig;
};

export interface EffectConfig {
  guid: string;
  name?: string;
  effectParameters: ParameterConfig[];
  shaderType: string;
  subEffectIds?: string[];
  inputMapping: Record<string, OutputInputMapping>;
  outputMapping: Record<string, OutputInputMapping>;
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

export type SplitValueEditorConfig = {
  numSplits: number;
  splitValues: number[];
};

export type EffectFunctionValueConfig = SplitValueEditorConfig | null;

export type OperatorConfig = {
  guid: string;
  functionId: string;
  value?: EffectFunctionValueConfig;
  outputMapping: Record<string, OutputInputMapping>;
  inputMapping: Record<string, OutputInputMapping>;
  inputMapSchema?: Record<string, string> | null;
  outputMapSchema?: Record<string, string> | null;
  effects?: ShaderEffectConfig[];
};

export type ShaderTransformationSchema = {
  id: string;
  transformCode: string[];
  returnValue: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  assignedVariableId: keyof typeof SHADER_VARIABLE_TYPES | string;
};

export type ShaderEffectSchema = {
  functions: unknown[];
  meshTransformIds: string[];
  parameters: ParameterConfig[];
  transformationConfig: ShaderTransformationSchema[];
  assignedVariableId: keyof typeof SHADER_VARIABLE_TYPES | string;
};
