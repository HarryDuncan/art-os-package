import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "./constants/shader.consts";
import { VARYING_TYPES } from "./shader-properties/varyings/varyings.consts";
import { VERTEX_EFFECTS } from "./vertex-effects/vertexEffects.consts";
import { FRAGMENT_EFFECTS } from "./fragment-effects/fragmentEffects.consts";
import { AssetType } from "../../../../types";

// GENERAL TYPES
export type ShaderPropertyConfig = {
  id: string;
  name?: string;
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  value?: unknown;
  arrayLength?: number;
  arrayValue?: unknown[];
  structProperties?: StructConfig;
  keyPointId?: string;
  effectIds?: string[];
};

export type ShaderFunction = {
  id: string;
  functionDefinition: string;
};

export interface EffectConfig {
  id: string;
  name?: string;
  isInteractive?: boolean;
  interactiveEffectIds?: string[];
  pairedEffectIds?: string[];
  effectParameters: ParameterConfig[];
  shaderType: string;
}
export type VertexEffectConfig = EffectConfig & {
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

export type VaryingConfig = ShaderPropertyConfig & {
  varyingType: VaryingTypes;
  attributeKey?: string;

  activeValue?: string;
  inactiveValue?: string;
};

// <------------------------------------ ATTRIBUTES ------------------------------>
export type RandomBoolConfig = {
  randomizedPercentage: number;
};
export type ShaderAttributeConfig = {
  attributeConfigs: AttributeConfig[];
  materialId: string;
};
export type AttributeValueConfig = RandomBoolConfig;
export type AttributeConfig = ShaderPropertyConfig & {
  configLocked?: boolean;
  attributeValueType: keyof typeof ATTRIBUTE_VALUE_TYPES;
  assetId?: string;
  attributeCount?: number;
  assetType?: AssetType;
  transformId?: string[];
  relationship?: string;
};

// <-------------------------------------UNIFORMS ---------------------------------->

export type UniformObject = {
  [key: string]: { value: unknown } | { value: unknown }[];
};

export type UniformConfig = ShaderPropertyConfig & {
  configLocked?: boolean;
  isAssetMapped?: boolean;
  assetMappingConfig?: {
    assetId: string;
    relationship: string;
  };
  interactionConfig?: {
    keyPointId: string;
  };
  tags?: string[];
};

export type ParameterConfig = ShaderPropertyConfig & {
  configLocked?: boolean;
  isAssetMapped?: boolean;
  description?: string;
  isUniform?: boolean;
  assetMappingConfig?: {
    assetId: string;
    relationship: string;
  };
  interactionConfig?: {
    keyPointId: string;
  };
};
export const SHADER_PROPERTY_TAGS = {
  COLOR: "color",
};

export type StructConfig = { id: string; properties: ShaderPropertyConfig[] };
export type BuiltShaderConfig = {
  shaderEffectConfigs: ShaderEffectConfig[];
  uniformConfig?: UniformConfig[];
  varyingConfig?: VaryingConfig[];
  attributeConfig?: AttributeConfig[];
  structConfigs?: StructConfig[];
};

export type TransformationConfig = {
  effectName: string;
  instantiationName?: string;
  instantiationType?: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  instantiationValue?: string;
  allowedValueTypes?: keyof (typeof SHADER_PROPERTY_VALUE_TYPES)[];
  effectCode: string[];
  singleInstance?: boolean;
  prefix?: string;
};
