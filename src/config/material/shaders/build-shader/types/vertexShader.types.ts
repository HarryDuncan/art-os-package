import { Axis } from "utils/three-dimension-space/position/position.types";
import { NOISE_EFFECT_TYPES } from "../vertex-effects/effects/displacement/noise/noise.consts";
import { EffectParameters, PreTransformConfig } from "./buildShader.types";
import {
  DISPLACEMENT_TYPES,
  DISTORTION_TYPES,
  IMAGE_VERTEX_EFFECT,
  TRIGGERED_VERTEX_EFFECT,
} from "../vertex-effects/vertexEffects.consts";

// <--------------------- VERTEX ---------------------------->
export type VertexEffectType = unknown;

export type ExplodeEffectProps = EffectParameters & {
  effectDistanceMinLength: number;
  effectStrength: number;
};

export type DisplacementType = keyof typeof DISPLACEMENT_TYPES;
export type DisplacementEffectProps = {
  props: {
    magnitude: {
      x: number;
      y: number;
      z: number;
    };
  };
};

export type DistortionType = keyof typeof DISTORTION_TYPES;
export type TwistDistortionProps = unknown;
export type DistortionParams = TwistDistortionProps;
export type DistortionEffectProps = EffectParameters & {
  distortionType: DistortionType;
  effectProps: DistortionParams;
};
export type ExpandEffectProps = EffectParameters & {
  effectDistanceMinLength: number;
  effectStrength: number;
  maxEffectStrength: number;
  multiplier: number;
};

export type NoiseEffectTypes = keyof typeof NOISE_EFFECT_TYPES;
export type NoiseEffectProps = EffectParameters & {
  noiseType: NoiseEffectTypes;
  effectStrength: number;
};
export type RotationEffectProps = EffectParameters & {
  effectType?: string;
  speed: number;
  degrees?: number;
  axis: Axis;
};

export type MorphEffectProps = {
  morphCount: number;
  preTransformConfigs: PreTransformConfig[];
};

export type PointPerspectiveConfig = {
  floor: number;
  ceiling: number;
  scaleFactor: number;
  divisor: number;
};

export type PointsEffectProps = {
  pointSize: number;
  perspectiveConfig: PointPerspectiveConfig;
};

// <-------------------- Image Vertex Effects ---------------------------------->

export type ImageToPointsEffectProps = EffectParameters;

type ImageSubEffect = {
  effectType: ImageVertexEffectType;
};
export type ImageVertexEffectProps = EffectParameters & ImageSubEffect;

export type ImageVertexEffectType = keyof typeof IMAGE_VERTEX_EFFECT;
export type ImageVertexEffect = EffectParameters & {
  declareInTransform: boolean;
  effectType: ImageVertexEffectType;
  effectProps: ImageVertexEffectProps;
};
// <----------------------Triggered ----------------------------------------->
export type TriggeredVertexEffectProps =
  | DisplacementEffectProps
  | ExplodeEffectProps
  | ExpandEffectProps;

export type TriggeredVertexEffectType = keyof typeof TRIGGERED_VERTEX_EFFECT;
export type TriggeredVertexEffect = {
  effectType: TriggeredVertexEffectType;
  effectProps: TriggeredVertexEffectProps;
};

export type TransitionEffectProps = EffectParameters & {
  effectType: string;
  effectProps: VertexEffectProps;
};

export type InteractiveVertexEffectProps =
  | DisplacementEffectProps
  | ExplodeEffectProps;

export type VertexEffectProps =
  | RotationEffectProps
  | DisplacementEffectProps
  | MorphEffectProps
  | PointsEffectProps
  | InteractiveVertexEffectProps
  | ExpandEffectProps
  | NoiseEffectProps
  | ExplodeEffectProps
  | ImageVertexEffect
  | ImageToPointsEffectProps
  | TriggeredVertexEffect;
