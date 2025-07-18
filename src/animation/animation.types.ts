import { Clock, Scene, Vector3 } from "three";
import {
  ANIMATION_RUN_STYLES,
  ANIMATION_TYPES,
  OBJECT_UPDATE_PROPERTY,
  TRIG_FUNCTION_TYPES,
} from "../consts/animation/animation.constants";
import {
  AnimationLoopConfigItem,
  TransitionLoopConfig,
} from "./animation-functions/shader-animations/animation-loop/animationloop.types";
import { Axis, Position3d } from "../types/position.types";

// to avoid dependency cycle
export type AnimatedScene = Scene & {
  clock: Clock;
};

export type AnimationConfig = {
  id: string;
  name?: string;
  runStyle: runStyle;
  targetIdentifiers: string[];
  animationType: AnimationType;
  animationProperties: AnimationProperties;
  isRunning?: boolean;
};

export interface AnimationPropertiesConfig {
  animationDurationMilis: number;
  repeatAnimation: boolean;
  animationPauseMilis: number;
}

export interface SpinAnimationConfig extends AnimationPropertiesConfig {
  rotationAxis: Axis;
  speed: number;
}
export interface RotationAnimationConfig extends AnimationPropertiesConfig {
  rotationAxis: Axis;
}

export interface MoveAnimationConfig extends AnimationPropertiesConfig {
  moveTo: Position3d;
  moveFrom: Position3d;
}
export interface TraversalAnimationConfig extends AnimationPropertiesConfig {
  startPosition: Position3d;
  endPosition: Position3d;
  curveSize: number;
  curve?: Vector3[];
}

export interface ShaderAnimationConfig extends AnimationPropertiesConfig {
  snapOnPause?: boolean;
  animationLoopConfig: AnimationLoopConfigItem[];
  transitionAnimation?: TransitionLoopConfig[];
}

export type FallParams = {
  bottom: number;
  top: number;
  speed: number;
  direction: number;
};
export interface FallAnimationConfig extends AnimationPropertiesConfig {
  fallParams: FallParams;
}

export type TrigFunctionType = keyof typeof TRIG_FUNCTION_TYPES;
export type ObjectUpdateProperty = keyof typeof OBJECT_UPDATE_PROPERTY;
export type runStyle = keyof typeof ANIMATION_RUN_STYLES;

export interface TrigonometricAnimationConfig
  extends AnimationPropertiesConfig {
  trigFunctionType: TrigFunctionType;
  objectUpdateProperty: ObjectUpdateProperty;
}

export type AnimationProperties =
  | RotationAnimationConfig
  | SpinAnimationConfig
  | TraversalAnimationConfig
  | TrigonometricAnimationConfig
  | ShaderAnimationConfig
  | MoveAnimationConfig
  | FallAnimationConfig;

export type AnimationType = keyof typeof ANIMATION_TYPES;
