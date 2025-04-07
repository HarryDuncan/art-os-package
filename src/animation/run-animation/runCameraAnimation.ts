import { Camera, Object3D } from "three";
import { AnimationConfig } from "../../types/animation.types";
import { ANIMATION_FUNCTION_TYPES } from "../../consts/animation/animation.constants";
import { animateAll } from "./run-functions/animateAll";
import { chainAnimation } from "./run-functions/chainAnimation";

export const runCameraAnimation = (
  camera: Camera,
  animationConfig: AnimationConfig
) => {
  const { animationProperties, animationFunctionType } = animationConfig;
  switch (animationFunctionType) {
    case ANIMATION_FUNCTION_TYPES.CHAIN:
      chainAnimation(animationProperties, [camera]);
      break;
    case ANIMATION_FUNCTION_TYPES.ALL:
    default:
      animateAll(animationProperties, [camera as Object3D]);
  }
};
