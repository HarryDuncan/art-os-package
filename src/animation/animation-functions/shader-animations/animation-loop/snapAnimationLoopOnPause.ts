import { ShaderMeshObject } from "../../../../config/mesh/mesh.types";
import { updateObjectUniformByKey } from "../uniforms/updateObjectUniformByKey";
import {
  ANIMATION_LOOP_KEYPOINTS,
  ANIMATION_LOOP_TYPES,
} from "./animationLoop.consts";
import {
  AnimationLoopConfigItem,
  AnimationLoopKeyPoint,
} from "./animationloop.types";

export const snapAnimationLoopOnPause = (
  config: AnimationLoopConfigItem[],
  animatedObject: ShaderMeshObject
) => {
  config.forEach(({ loopType, uniform, toMaterial }) => {
    const loopKey = screamingSnakeToCamel(loopType);
    if (
      (toMaterial && animatedObject.material.name === toMaterial) ||
      !toMaterial
    ) {
      const keypoints = ANIMATION_LOOP_KEYPOINTS as Record<
        string,
        AnimationLoopKeyPoint
      >;
      switch (loopType) {
        case ANIMATION_LOOP_TYPES.ONE_TO_ONE:
        case ANIMATION_LOOP_TYPES.ZERO_TO_ONE:
        case ANIMATION_LOOP_TYPES.ZERO_TO_ZERO: {
          const uniformValue = keypoints[loopKey].end;
          updateObjectUniformByKey(animatedObject, uniform, uniformValue);
          break;
        }

        default:
          break;
      }
    }
  });
};

const screamingSnakeToCamel = (screamingSnake: string) => {
  const words = screamingSnake.toLowerCase().split("_");
  for (let i = 1; i < words.length; i += 1) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }
  return words.join("");
};
