import { Position3d } from "../../position.types";
import {
  ATTRIBUTE_VALUE_TYPES,
  DEFAULT_UNIFORMS,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../consts/materials/shader.consts";
import { VARYING_TYPES } from "../../../config/material/shaders/build-shader/shader-properties/varyings/varyings.consts";
import {
  INTERACTION_VERTEX_EFFECT,
  TransformTypes,
  VERTEX_EFFECTS,
} from "../../../consts/materials/vertexEffects.consts";
import {
  FragmentEffectProps,
  InteractiveFragmentEffect,
  TriggeredFragmentEffect,
} from "./fragmentShader.types";
import { POINT_PARENTS } from "../../../config/material/shaders/build-shader/constants";
import { AssetToUniformMappingConfig, AssetType } from "../..";
import {
  InteractiveVertexEffectProps,
  TriggeredVertexEffect,
  VertexEffectProps,
} from "./vertexShader.types";
import { FRAGMENT_EFFECT } from "../../../consts/materials/fragmentEffects.consts";

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
}
export type VertexEffectConfig = EffectConfig & {
  effectType: keyof typeof VERTEX_EFFECTS;
  effectProps: VertexEffectProps;
};

export type FragmentEffectConfig = EffectConfig & {
  effectType: keyof typeof FRAGMENT_EFFECT;
  effectProps: FragmentEffectProps;
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
  idLocked?: boolean;
  attributeValueType: keyof typeof ATTRIBUTE_VALUE_TYPES;
  assetId?: string;
  attributeCount?: number;
  assetType?: AssetType;
  effectIds?: string[];
};

// <-------------------------------------UNIFORMS ---------------------------------->

export type DefaultUniform = keyof typeof DEFAULT_UNIFORMS;
export type UniformObject = {
  [key: string]: { value: unknown } | { value: unknown }[];
};

export type UniformValueConfig = ShaderPropertyConfig & {
  effectIds?: string[];
  isAssetMapped?: boolean;
  assetMappingConfig?: {
    assetId: string;
    relationship: string;
  };
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

export type VertexTransformationConfig = {
  effectName: string;
  instantiationName?: string;
  instantiationType?: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  instantiationValue?: string;
  allowedValueTypes?: keyof (typeof SHADER_PROPERTY_VALUE_TYPES)[];
  effectCode: string[];
  singleInstance?: boolean;
  prefix?: string;
};
