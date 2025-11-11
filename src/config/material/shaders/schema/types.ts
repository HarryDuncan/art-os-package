import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
  VARYING_TYPES,
} from "./consts";

export type InterNodeMap = {
  itemId: string;
  nodeType: string;
  type?: string;
  // Mainly used for graph re-mapping
  parentId: string;
  parentType: string;
};

export interface OutputMap extends InterNodeMap {
  sourceType: string;
  sourceKey: string;
  sourceId: string;
}

export interface InputMap extends InterNodeMap {
  targetType: string;
  targetKey: string;
  targetId: string;
}

export type EffectConfig = {
  guid: string;
  name?: string;
  type: string;
  schemaId: string;
  outputValueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  inputMapping: Record<string, InputMap>;
  outputMapping: Record<string, OutputMap>;
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

export type SplitValueEditorConfig = {
  numSplits: number;
  splitValues: { key: string; value: number }[];
};
export type SequenceEditorConfig = {
  numSequences: number;
  sequenceBounds: { key: string; lowerBound: number; upperBound: number }[];
};

export type OperatorValueConfig =
  | SplitValueEditorConfig
  | SequenceEditorConfig
  | null;

export type OperatorConfig = {
  guid: string;
  schemaId: string;
  value?: OperatorValueConfig;
  outputMapping: Record<string, OutputMap>;
  inputMapping: Record<string, InputMap>;
  inputMapSchema?: Record<string, string> | null;
  outputMapSchema?: Record<string, string> | null;
  effects?: EffectConfig[];
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

export type StructVariableConfig = {
  key: string;
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
};
export type StructConfig = {
  key: string;
  variables: StructVariableConfig[];
};
