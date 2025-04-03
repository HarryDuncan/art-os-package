import { Position3d } from "../../../../../types/position.types";
import {
  POINT_PARENTS,
  ShaderPropertyValueTypes,
} from "../constants/buildShader.consts";
import { VARYING_TYPES } from "../shader-properties/varyings/varyings.consts";
import {
  INTERACTION_VERTEX_EFFECT,
  TransformTypes,
} from "../vertex-effects/vertexEffects.consts";
import {
  FragmentEffectConfig,
  InteractiveFragmentEffect,
  TriggeredFragmentEffect,
} from "./fragmentShader.types";
import {
  DisplacementType,
  InteractiveVertexEffectProps,
  TriggeredVertexEffect,
  VertexEffectProps,
} from "./vertexShader.types";
import { DEFAULT_UNIFORMS } from "../constants";
import { AssetType } from "../../../../../assets/asset.types";

// GENERAL TYPES
export type ShaderPropertyConfig = {
  id: string;
  valueType: ShaderPropertyValueTypes;
  value?: unknown;
  arrayLength?: number;
  arrayValue?: unknown[];
  structProperties?: StructConfig;
};

export type ShaderFunction = {
  id: string;
  functionDefinition: string;
};

export type EffectParameters = {};

export type PointParent = keyof typeof POINT_PARENTS;

export type TriggeredEffectProps =
  | TriggeredFragmentEffect
  | TriggeredVertexEffect;

// <--------------------- Interactive ---------------------------------------->
export type InteractiveEffectProps =
  | InteractiveFragmentEffect
  | InteractiveVertexEffect;

export type InteractiveVertexEffectType =
  keyof typeof INTERACTION_VERTEX_EFFECT;

export type InteractiveVertexEffect = {
  effectType: InteractiveVertexEffect;
  effectProps: InteractiveVertexEffectProps;
};

export type VertexEffectConfig = {
  effectType: DisplacementType;
  effectProps: VertexEffectProps;
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
  valueConfig?: AttributeValueConfig;
  assetId?: string;
  attributeCount?: number;
  assetType?: AssetType;
};

// <-------------------------------------UNIFORMS ---------------------------------->

export type DefaultUniform = keyof typeof DEFAULT_UNIFORMS;
export type UniformObject = {
  [key: string]: { value: unknown } | { value: unknown }[];
};
export type UniformValueConfig = ShaderPropertyConfig;
export type UniformConfig = {
  defaultUniforms: DefaultUniform[];
  customUniforms?: UniformValueConfig[];
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
