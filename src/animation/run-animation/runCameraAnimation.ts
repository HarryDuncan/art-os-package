import { Camera, Object3D } from "three";
import { AnimationConfig } from "../animation.types";
import { ANIMATION_RUN_STYLES } from "../../consts/animation/animation.constants";
import { animateAll } from "./run-functions/animateAll";
import { chainAnimation } from "./run-functions/chainAnimation";

export const runCameraAnimation = (
  camera: Camera,
  animationConfig: AnimationConfig
) => {
  const { animationProperties, runStyle, animationType } = animationConfig;
  if (!animationProperties) {
    console.error("Animation properties are required");
    return;
  }
  switch (runStyle) {
    case ANIMATION_RUN_STYLES.CHAIN:
      chainAnimation(animationType, animationProperties, [camera]);
      break;
    case ANIMATION_RUN_STYLES.ALL:
    default:
      animateAll(animationType, animationProperties, [camera as Object3D]);
  }
};
