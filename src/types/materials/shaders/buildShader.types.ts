import { Position3d } from "../../position.types";
import {
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
  FragmentEffectConfig,
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

// GENERAL TYPES
export type ShaderPropertyConfig = {
  id: string;
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  value?: unknown;
  arrayLength?: number;
  arrayValue?: unknown[];
  structProperties?: StructConfig;
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

export type VertexEffectConfig = {
  id: string;
  name?: string;
  effectType: keyof typeof VERTEX_EFFECTS;
  effectProps: VertexEffectProps;
  isInteractive?: boolean;
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

export type UniformValueConfig = ShaderPropertyConfig & {
  effectIds?: string[];
};

export type InteractionMappedUniform = UniformValueConfig & {
  keyPointKey: string;
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
  instantiationName: string;
  instantiationType: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  instantiationValue: string;
  allowedValueTypes: keyof (typeof SHADER_PROPERTY_VALUE_TYPES)[];
  effectCode: string[];
};
