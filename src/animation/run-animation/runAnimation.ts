import {
  AnimatedScene,
  AnimationConfig,
  ShaderAnimationConfig,
} from "../../types/animation.types";
import { ANIMATION_RUN_STYLES } from "../../consts/animation/animation.constants";
import { animateAll } from "./run-functions/animateAll";
import { chainAnimation } from "./run-functions/chainAnimation";
import { ShaderMeshObject } from "../../types/mesh.types";
import { runShaderAnimations } from "../animation-functions/shader-animations/runShaderAnimations";
import { getSceneElementByName } from "../../utils/scene/getSceneElementByName";
import { runRiggedAnimation } from "../animation-functions/rigged-animation/runRiggedAnimation";
import { Mesh } from "three";
import { RiggedAnimationConfig } from "../animation-functions/rigged-animation/riggedAnimations.types";

export const runAnimation = (
  scene: AnimatedScene,
  animationConfig: AnimationConfig,
  id: string
) => {
  const { targetIdentifiers, runStyle, animationProperties, animationType } =
    animationConfig;

  const animatedObjects = getSceneElementByName(scene, targetIdentifiers);
  if (!animatedObjects.length) {
    console.warn(
      `${id} can't run. No meshes selected with ${targetIdentifiers.map(
        (id) => `id: ${id}  `
      )}`
    );
    return;
  }

  switch (runStyle) {
    case ANIMATION_RUN_STYLES.CHAIN:
      chainAnimation(animationType, animationProperties, animatedObjects);
      break;
    case ANIMATION_RUN_STYLES.UTIME:
      runShaderAnimations(
        scene,
        animationProperties as ShaderAnimationConfig,
        animatedObjects as ShaderMeshObject[]
      );
      break;
    case ANIMATION_RUN_STYLES.RIGGED:
      runRiggedAnimation(
        animationProperties as RiggedAnimationConfig,
        animatedObjects as Mesh[]
      );
      break;
    case ANIMATION_RUN_STYLES.ALL:
    default:
      animateAll(animationType, animationProperties, animatedObjects);
  }
};
