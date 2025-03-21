"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSceneElementAnimations = void 0;
const startSceneElementAnimations = (scene) => {
    const sceneElementAnimationIds = scene.animationManager.sceneElementAnimations.flatMap(({ isRunning, animationId }) => (!isRunning ? animationId : []));
    sceneElementAnimationIds.forEach((id) => {
        scene.animationManager.startAnimation(scene, id);
    });
};
exports.startSceneElementAnimations = startSceneElementAnimations;
