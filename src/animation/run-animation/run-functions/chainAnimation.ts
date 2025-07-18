import { MeshObject } from "../../../config/mesh/types";
import { Object3D } from "three";
import { AnimationProperties, AnimationType } from "../../animation.types";
import { performAnimation } from "../performAnimation";
import { stepAndWrap } from "../../../utils/maths/maths";

export const chainAnimation = (
  animationType: AnimationType,
  animationProperties: AnimationProperties,
  animatedObjects: MeshObject[] | Object3D[]
) => {
  const {
    animationDurationMilis,

    animationPauseMilis,
    repeatAnimation,
  } = animationProperties;
  let startTime: number;
  let currentItemIndex = 0;
  function step(timestamp: number) {
    const object = animatedObjects[currentItemIndex];
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    performAnimation(animationType, object, progress, animationProperties);
    if (progress < animationDurationMilis || animationDurationMilis === -1) {
      requestAnimationFrame(step);
    } else {
      startTime = 0;
      currentItemIndex = stepAndWrap(
        0,
        animatedObjects.length - 1,
        currentItemIndex
      );
      if (repeatAnimation) {
        setTimeout(() => {
          step(timestamp + animationPauseMilis);
        }, animationPauseMilis);
      }
    }
  }

  requestAnimationFrame(step);
};
