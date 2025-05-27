import {
  ATTRIBUTE_VALUE_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "./constants/shader.consts";
import { VARYING_TYPES } from "./shader-properties/varyings/varyings.consts";
import { VERTEX_EFFECTS } from "./vertex-effects/vertexEffects.consts";
import { FRAGMENT_EFFECTS } from "./fragment-effects/fragmentEffects.consts";
import { SHADER_VARIABLE_TYPES } from "./constants";

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
  functionType: string;
  functionName: string;
  functionInstantiation?: string;
  parameterMappingInstantiation?: Record<string, string>;
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
  functionInstantiationParameterMapping?: Record<string, string>;
};
export type ParameterConfig = ShaderPropertyConfig & {
  configLocked?: boolean;
  description?: string;
  isUniform?: boolean;
  isInteractive?: boolean;
  isAssetMapped?: boolean;
  isAttribute?: boolean;
  isVarying?: boolean;
  tags?: string[];
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
  functionContent: string[];
  returnValue: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  shaderVariableType?: keyof typeof SHADER_VARIABLE_TYPES | string;
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
