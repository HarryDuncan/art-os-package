export const startSceneElementAnimations = (scene) => {
    const sceneElementAnimationIds = scene.animationManager.sceneElementAnimations.flatMap(({ isRunning, animationId }) => (!isRunning ? animationId : []));
    sceneElementAnimationIds.forEach((id) => {
        scene.animationManager.startAnimation(scene, id);
    });
};
