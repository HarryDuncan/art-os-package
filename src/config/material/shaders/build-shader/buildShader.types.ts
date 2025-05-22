import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "./constants/shader.consts";
import { VARYING_TYPES } from "./shader-properties/varyings/varyings.consts";
import { VERTEX_EFFECTS } from "./vertex-effects/vertexEffects.consts";
import { FRAGMENT_EFFECTS } from "./fragment-effects/fragmentEffects.consts";

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

// <-------------------------------------UNIFORMS ---------------------------------->

export type UniformObject = {
  [key: string]: { value: unknown } | { value: unknown }[];
};

export type ParameterConfig = ShaderPropertyConfig & {
  configLocked?: boolean;

  description?: string;
  isUniform?: boolean;
  isInteractive?: boolean;
  isAssetMapped?: boolean;
  isAttribute?: boolean;
  assetMappingConfig?: {
    assetId: string;
    relationship: string;
  };
  interactionConfig?: {
    keyPointId: string;
  };
  attributeConfig?: {
    attributeValueType: keyof typeof ATTRIBUTE_VALUE_TYPES;
    assetId: "";
    attributeCount?: number;
  };
};

export type StructConfig = { id: string; properties: ShaderPropertyConfig[] };
export type BuiltShaderConfig = {
  shaderEffectConfigs: ShaderEffectConfig[];
  uniformConfigs?: ParameterConfig[];
  varyingConfigs?: VaryingConfig[];
  attributeConfigs?: ParameterConfig[];
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
