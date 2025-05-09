import {
  FRAGMENT_EFFECT,
  INTERACTION_FRAGMENT_EFFECT,
  TRIGGERED_FRAGMENT_EFFECT,
} from "../../../config/material/shaders/build-shader/fragment-effects/fragmentEffects.consts";
import {
  ShaderFunction,
  UniformConfig,
  VaryingConfig,
  AttributeConfig,
  StructConfig,
} from "./buildShader.types";

export type FragmentEffectType = keyof typeof FRAGMENT_EFFECT;
export type PointTexture = {
  id: string;
  pointColor: string;
};
export type PointColorFragmentEffectProps = {
  pointColor: string;
};
export type PointMaterialFragmentEffectProps = {
  isTextured: boolean;
  effectProps?: Record<string, unknown>;
};

export type MaterialEffectProps = {
  opacity?: number;
};

export type PhysicalMaterialProps = Record<string, unknown>;
export type PhongFragmentEffectProps = Record<string, unknown>;
export type ColorFragmentEffectProps = {
  shadingType: string;
  color: string;
  opacity?: number;
};

export type VanishFragmentEffectProps = {
  numberOfRings?: number;
  vanishHeight: number;
};
export type OpacityFragmentEffectProps = {
  opacity: number;
  asUniform: boolean;
};

export type BrightnessFragmentEffectProps = Record<string, unknown>;

export type FragmentEffectProps =
  | PointMaterialFragmentEffectProps
  | ColorFragmentEffectProps
  | OpacityFragmentEffectProps
  | VanishFragmentEffectProps
  | TriggeredFragmentEffect
  | MaterialEffectProps
  | InteractiveFragmentEffect
  | BrightnessFragmentEffectProps;

export interface FragmentEffectData {
  requiredFunctions: ShaderFunction[];
  uniformConfig: UniformConfig;
  varyingConfig: VaryingConfig[];
  attributeConfig: AttributeConfig[];
  transformation: string;
  structConfigs?: StructConfig[];
}

// <------------------------------------Interactive ------------------------------------->
export type InteractiveFragmentEffectProps = PointColorFragmentEffectProps;
export type InteractiveFragmentEffectType =
  keyof typeof INTERACTION_FRAGMENT_EFFECT;

export type InteractiveFragmentEffect = {
  effectType: InteractiveFragmentEffectType;
  effectProps: InteractiveFragmentEffectProps;
};

// <----------------------------------------TRIGGERED -------------------------------------->

export type TriggeredFragmentEffectProps =
  | PointColorFragmentEffectProps
  | OpacityFragmentEffectProps;
export type TriggeredFragmentEffectType =
  keyof typeof TRIGGERED_FRAGMENT_EFFECT;
export type TriggeredFragmentEffect = {
  effectType: TriggeredFragmentEffectType;
  effectProps: TriggeredFragmentEffectProps;
};
