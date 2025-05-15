import { Position3d } from "../../../../types/position.types";
import {
  ATTRIBUTE_VALUE_TYPES,
  DEFAULT_UNIFORMS,
  SHADER_PROPERTY_VALUE_TYPES,
} from "./constants/shader.consts";
import { VARYING_TYPES } from "./shader-properties/varyings/varyings.consts";
import {
  INTERACTION_VERTEX_EFFECT,
  TransformTypes,
  VERTEX_EFFECTS,
} from "./vertex-effects/vertexEffects.consts";
import {
  FragmentEffectProps,
  InteractiveFragmentEffect,
  TriggeredFragmentEffect,
} from "./fragment-effects/fragmentShader.types";
import { POINT_PARENTS } from "./constants";
import { AssetToUniformMappingConfig } from "../../../../types/materials/index";
import {
  InteractiveVertexEffectProps,
  TriggeredVertexEffect,
  VertexEffectProps,
} from "./vertex-effects/vertexShader.types";
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

export type ShaderFunction = {
  id: string;
  functionDefinition: string;
};

export type PointParent = keyof typeof POINT_PARENTS;

export type TriggeredEffectProps =
  | TriggeredFragmentEffect
  | TriggeredVertexEffect;

// <--------------------- Interactive ---------------------------------------->
export type InteractiveEffectParams =
  | InteractiveFragmentEffect
  | InteractiveVertexEffect;

export type InteractiveVertexEffectType =
  keyof typeof INTERACTION_VERTEX_EFFECT;

export type InteractiveVertexEffect = {
  effectType: string;
  effectProps: InteractiveVertexEffectProps;
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
  effectProps: VertexEffectProps;
  subEffects?: VertexEffectConfig[];
};

export type FragmentEffectConfig = EffectConfig & {
  effectType: keyof typeof FRAGMENT_EFFECT;
  effectProps: FragmentEffectProps;
  subEffects?: FragmentEffectConfig[];
};

// PRE-TRANSFORMS

export type TranslateTransformProps = {
  translate: Partial<Position3d>;
};
export type TransformProps = TranslateTransformProps;
export type PreTransformConfig = {
  index: number;
  pointName: string;
  transformType: TransformTypes;
  transformProps: TransformProps;
};
export type PreTransformData = {
  index: number;
  transform: string;
  positionName: string;
  normalName: string;
  requiredFunctions: ShaderFunction[];
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

export type DefaultUniform = keyof typeof DEFAULT_UNIFORMS;
export type UniformObject = {
  [key: string]: { value: unknown } | { value: unknown }[];
};

export type UniformValueConfig = ShaderPropertyConfig & {
  effectIds?: string[];
  configLocked?: boolean;
  isAssetMapped?: boolean;
  assetMappingConfig?: {
    assetId: string;
    relationship: string;
  };
  tags?: string[];
};

export const SHADER_PROPERTY_TAGS = {
  COLOR: "color",
};

export type InteractionMappedUniform = UniformValueConfig & {
  keyPointId: string;
};
export type UniformConfig = {
  defaultUniforms: DefaultUniform[];
  customUniforms?: UniformValueConfig[];
  mappedAssets?: AssetToUniformMappingConfig[];
  interactionMappedUniforms?: InteractionMappedUniform[];
};

export type StructConfig = { id: string; properties: ShaderPropertyConfig[] };
export type BuiltShaderConfig = {
  vertexEffectConfigs: VertexEffectConfig[];
  fragmentEffectConfigs: FragmentEffectConfig[];
  uniformConfig?: UniformConfig;
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
