import { AXIS } from "../utils/three-dimension-space/position/position.types";
import { ANIMATION_TYPES } from "./animation.constants";

export const DEFAULT_ANIMATION_DURATION_MILIS = 1000;
export const DEFAULT_ROTATION_CONFIG = {
  animationType: ANIMATION_TYPES.ROTATE,
  animationProperties: {
    animationDurationMilis: 700,
    animationPauseMilis: 100,
    repeatAnimation: true,
    rotationAxis: AXIS.Z,
  },
};

export const DEFAULT_SPIN_CONFIG = {
  animationType: ANIMATION_TYPES.SPIN,
  animationProperties: {
    rotationAxis: AXIS.Y,
    speed: 0.009,
    animationDurationMilis: 2000,
    animationPauseMilis: 10,
    repeatAnimation: true,
  },
};
