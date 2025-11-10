import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
  VARYING_TYPES,
} from "./consts";
import { MESH_TRANSFORM_TYPES } from "./mesh-transforms";

export type OutputInputMapping = {
  itemId: string;
  nodeType: string;
  type?: string;
  // Mainly used for graph re-mapping
  parentId: string;
  parentType: string;
};

export type EffectConfig = {
  guid: string;
  name?: string;
  schemaId: string;
  outputValueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  inputMapping: Record<string, OutputInputMapping>;
  outputMapping: Record<string, OutputInputMapping>;
  transformSchema?: ShaderTransformationSchema[];
  disabled?: boolean;
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

  // TODO - update this and remove function config
  isFunctionBased?: boolean;
  functionConfig?: EffectConfig;
};

export interface ShaderEffectConfig extends EffectConfig {
  shaderType: string;
}

export type SplitValueEditorConfig = {
  numSplits: number;
  splitValues: number[];
};
export type SequenceEditorConfig = {
  numSequences: number;
  sequenceBounds: number[][];
};

export type OperatorValueConfig =
  | SplitValueEditorConfig
  | SequenceEditorConfig
  | null;

export type OperatorConfig = {
  guid: string;
  schemaId: string;
  value?: OperatorValueConfig;
  outputMapping: Record<string, OutputInputMapping>;
  inputMapping: Record<string, OutputInputMapping>;
  inputMapSchema?: Record<string, string> | null;
  outputMapSchema?: Record<string, string> | null;
  effects?: ShaderEffectConfig[];
  disabled?: boolean;
};

export type ShaderTransformationOutputConfig = {
  key: string;
  valueType: string;
};
export type ShaderTransformationParameterConfig = {
  key: string;
  valueType: string;
};
export type ShaderTransformationSchema = {
  key: string;
  transformCode: string[];
  isSubFunction: boolean;
  parameters: ShaderTransformationParameterConfig[];
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
