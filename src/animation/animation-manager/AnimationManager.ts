import { Camera } from "three";
import { AnimatedScene, AnimationConfig } from "../../types/animation.types";
import { runAnimation } from "../run-animation/runAnimation";
import { setUpAnimationConfig } from "./setUpAnimationConfig";
import { GENERIC_TARGET_IDENTIFIERS } from "../../consts/animation/animation.constants";
import { runCameraAnimation } from "../run-animation/runCameraAnimation";

export class AnimationManager {
  sceneElementAnimations: AnimationConfig[];

  cameraElementAnimations: AnimationConfig[];

  constructor(animationConfig: AnimationConfig[]) {
    this.sceneElementAnimations = [];
    this.cameraElementAnimations = [];
    this.initializeAnimations(animationConfig);
  }

  initializeAnimations(animations: AnimationConfig[]) {
    animations.forEach((animation) => {
      if (
        this.sceneElementAnimations.findIndex(
          (setAnimation) => setAnimation.animationId === animation.animationId
        ) !== -1
      ) {
        console.warn(
          `an animation with this animation id ${animation.animationId} already exists`
        );
      } else if (
        animation.targetIdentifier === GENERIC_TARGET_IDENTIFIERS.CAMERA
      ) {
        this.cameraElementAnimations.push({ ...animation, isRunning: false });
      } else {
        this.sceneElementAnimations.push({ ...animation, isRunning: false });
      }
    });
  }

  startAnimation(scene: AnimatedScene, animationId: string) {
    const animation = this.sceneElementAnimations.find(
      (configuredAnimation) => configuredAnimation.animationId === animationId
    );
    if (!animation) {
      console.warn(`animation: ${animationId} has not been initialized`);
    } else if (animation?.isRunning === false) {
      const initializedConfig = setUpAnimationConfig(animation);
      animation.isRunning = true;
      runAnimation(scene, initializedConfig, animationId);
    }
  }

  hasCameraAnimations() {
    return this.cameraElementAnimations.length > 0;
  }

  startCameraAnimation(camera: Camera) {
    // TODO - set up methods for multiple camera animations
    const animation = this.cameraElementAnimations[0];
    if (!animation) {
      console.warn(`no camera animations configured`);
    }

    if (animation.isRunning === false) {
      const initializedAnimationConfig = setUpAnimationConfig(animation);
      animation.isRunning = true;
      runCameraAnimation(camera, initializedAnimationConfig);
    }
  }

  stopAnimation(animationId: string) {
    const animation = this.sceneElementAnimations.find(
      (configuredAnimation) => configuredAnimation.animationId === animationId
    );
    if (animation) {
      animation.isRunning = false;
    }
  }
}
