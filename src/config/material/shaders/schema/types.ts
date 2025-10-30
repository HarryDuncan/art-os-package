import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
  SHADER_VARIABLE_TYPES,
  VARYING_TYPES,
} from "./consts";
import { MESH_TRANSFORM_TYPES } from "./mesh-transforms";

export type SchemaData = {
  id: string;
  name: string;
  description: string;
};

export type OutputInputMapping = {
  itemId: string;
  nodeType: string;
  type?: string;
};

export type ParameterFunctionConfig = {
  schemaId: string;
  outputValueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  inputMapping: Record<string, OutputInputMapping>;
  transformSchema?: ShaderTransformationSchema[];
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
  // the key - is the variable displayed in the shader code
  key: string;
  guid: string;
  name?: string;
  description?: string;
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  value?: unknown;
  arrayLength?: number;
  arrayValue?: unknown[];
  parameterType: keyof typeof SHADER_PROPERTY_TYPES;

  isAssetMapped?: boolean;
  isDefault?: boolean;
  tags?: string[];
  fromConfig?: boolean;
  assetMappingConfig?: {
    assetId: string;
    relationship: string;
  };
  attributeConfig?: AttributeConfig;
  varyingConfig?: VaryingConfig;

  isFunctionBased?: boolean;
  functionConfig?: ParameterFunctionConfig;

  shaderVariableConfig?: ShaderVariableConfig;
};

export interface EffectConfig {
  guid: string;
  name?: string;
  schemaId: string;
  shaderType: string;
  inputMapping: Record<string, OutputInputMapping>;
  outputMapping: Record<string, OutputInputMapping>;
  effectSchemas?: ShaderTransformationSchema[];
  disabled?: boolean;
}

export type VertexEffectConfig = EffectConfig;

export type FragmentEffectConfig = EffectConfig;

export type ShaderEffectConfig = FragmentEffectConfig | VertexEffectConfig;

export type SplitValueEditorConfig = {
  numSplits: number;
  splitValues: number[];
};
export type SequenceEditorConfig = {
  numSequences: number;
  sequenceBounds: number[][];
};

export type EffectFunctionValueConfig =
  | SplitValueEditorConfig
  | SequenceEditorConfig
  | null;

export type OperatorConfig = {
  guid: string;
  schemaId: string;
  value?: EffectFunctionValueConfig;
  outputMapping: Record<string, OutputInputMapping>;
  inputMapping: Record<string, OutputInputMapping>;
  inputMapSchema?: Record<string, string> | null;
  outputMapSchema?: Record<string, string> | null;
  effects?: ShaderEffectConfig[];
  disabled?: boolean;
};

export type ShaderTransformationOutputConfig = {
  key: string;
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
};
export type ShaderTransformationSchema = {
  key: string;
  transformCode: string[];
  isRoot: boolean;
  outputConfig: ShaderTransformationOutputConfig[];
};

export type MeshTransformSchema = {
  key: string;
  guid: string;
  type: keyof typeof MESH_TRANSFORM_TYPES;
  parameters: ParameterConfig[];
  transformedMeshIds: string[];
  materialId: string;
};

export type StructVariableConfig = {
  key: string;
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
};
export type StructConfig = {
  key: string;
  variables: StructVariableConfig[];
};
