import { performAnimation } from "../performAnimation";

import { MeshObject } from "../../../config/mesh/mesh.types";
import { Object3D } from "three";
import {
  AnimationProperties,
  AnimationType,
} from "../../../types/animation.types";

export const animateAll = (
  animationType: AnimationType,
  animationProperties: AnimationProperties,
  animatedObjects: MeshObject[] | Object3D[]
) => {
  const { animationDurationMilis, repeatAnimation, animationPauseMilis } =
    animationProperties;
  let startTime: number;
  let count = 0;
  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    animatedObjects.forEach((object) => {
      performAnimation(
        animationType,
        object,
        progress,
        animationProperties,
        count
      );
    });
    if (progress < animationDurationMilis || animationDurationMilis === -1) {
      requestAnimationFrame(step);
    } else {
      startTime = 0;
      count += 1;
      if (repeatAnimation) {
        setTimeout(() => {
          requestAnimationFrame(step);
        }, animationPauseMilis);
      }
    }
  }
  requestAnimationFrame(step);
};
