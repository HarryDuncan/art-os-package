import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "./constants/shader.consts";
import { VARYING_TYPES } from "./shader-properties/varyings/varyings.consts";
import { VERTEX_EFFECTS } from "./vertex-effects/vertexEffects.consts";
import { FRAGMENT_EFFECT } from "./fragment-effects/fragmentEffects.consts";
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
};
export type EffectParameters = Record<string, unknown>;
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
}
export type VertexEffectConfig = EffectConfig & {
  effectType: keyof typeof VERTEX_EFFECTS;
  effectParameters: EffectParameters;
  subEffects?: VertexEffectConfig[];
};

export type FragmentEffectConfig = EffectConfig & {
  effectType: keyof typeof FRAGMENT_EFFECT;
  effectParameters: EffectParameters;
  subEffects?: FragmentEffectConfig[];
};

// <---------------------------------------- VARYING ------------------------>
export type VaryingTypes = keyof typeof VARYING_TYPES;

export type VaryingConfig = ShaderPropertyConfig & {
  varyingType: VaryingTypes;
  attributeKey?: string;
  effectIds?: string[];
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
  effectIds?: string[];
  transformId?: string[];
  relationship?: string;
};

// <-------------------------------------UNIFORMS ---------------------------------->

export type UniformObject = {
  [key: string]: { value: unknown } | { value: unknown }[];
};

export type UniformConfig = ShaderPropertyConfig & {
  effectIds?: string[];
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

export const SHADER_PROPERTY_TAGS = {
  COLOR: "color",
};

export type StructConfig = { id: string; properties: ShaderPropertyConfig[] };
export type BuiltShaderConfig = {
  vertexEffectConfigs: VertexEffectConfig[];
  fragmentEffectConfigs: FragmentEffectConfig[];
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
