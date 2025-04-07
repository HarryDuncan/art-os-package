import { InteractiveScene } from "../../components/interactive-scene/InteractiveScene";
import { AnimatedScene } from "../../types/animation.types";

export const startSceneElementAnimations = (scene: InteractiveScene) => {
  const sceneElementAnimationIds =
    scene.animationManager.sceneElementAnimations.flatMap(
      ({ isRunning, animationId }) => (!isRunning ? animationId : [])
    );

  sceneElementAnimationIds.forEach((id) => {
    scene.animationManager.startAnimation(
      scene as unknown as AnimatedScene,
      id
    );
  });
};
