import { calculateCurve } from "../animation-functions/mesh-animations/traversal/calculateBeizier";
import { ANIMATION_TYPES } from "../../consts/animation/animation.constants";
import {
  AnimationConfig,
  TraversalAnimationConfig,
} from "../../types/animation.types";
import { DEFAULT_ANIMATION_DURATION_MILIS } from "../../consts/animation/animation.defaults";
import { position3dToVector } from "../../utils/conversion/conversion";

export const setUpAnimationConfig = (
  animationConfig: AnimationConfig
): AnimationConfig => {
  const { animationProperties } = animationConfig;
  switch (animationProperties.animationType) {
    case ANIMATION_TYPES.TRAVERSE: {
      const { startPosition, endPosition, curveSize, animationDurationMilis } =
        animationProperties as TraversalAnimationConfig;
      const curveStart = position3dToVector(startPosition);
      const curveEnd = position3dToVector(endPosition);
      const curve = calculateCurve(curveStart, curveEnd, curveSize);
      return {
        ...animationConfig,
        animationProperties: {
          ...animationProperties,
          startPosition: curveStart,
          endPosition: curveEnd,
          animationDurationMilis:
            animationDurationMilis ?? DEFAULT_ANIMATION_DURATION_MILIS,
          curve,
        },
      };
    }
    default: {
      return animationConfig;
    }
  }
};
