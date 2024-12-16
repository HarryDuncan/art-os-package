import { InteractiveScene } from "display/components/interactive-scene/InteractiveScene";

export const startSceneElementAnimations = (scene: InteractiveScene) => {
  const sceneElementAnimationIds =
    scene.animationManager.sceneElementAnimations.flatMap(
      ({ isRunning, animationId }) => (!isRunning ? animationId : [])
    );
  sceneElementAnimationIds.forEach((id) => {
    scene.animationManager.startAnimation(scene, id);
  });
};
