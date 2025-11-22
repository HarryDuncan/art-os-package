import { ScreenType } from "../../../../compat/window-state/types";
import { InputMap, OutputMap } from "../../../../types";
import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
  VARYING_TYPES,
} from "./consts";

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

  screenSizeAdjustment?: Record<ScreenType, unknown>;

  // TODO - update this and remove function config
  isFunctionBased?: boolean;
  functionConfig?: EffectConfig;
};

export type SplitValueEditorConfig = {
  numSplits: number;
};
export type SplitValue = Record<string, number>;

export type Sequence = Record<string, [number, number]>;
export type OperatorValueConfig = SplitValueEditorConfig;

export type OperatorValue = SplitValue;
export type OperatorConfig = {
  guid: string;
  schemaId: string;
  valueConfig: OperatorValueConfig;
  value: OperatorValueConfig;
  outputMapping: Record<string, OutputMap>;
  inputMapping: Record<string, InputMap>;
  inputMapSchema: Record<string, string>;
  outputMapSchema: Record<string, string>;
  type: string;
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
