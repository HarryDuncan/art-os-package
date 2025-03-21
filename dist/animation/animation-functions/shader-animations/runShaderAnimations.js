"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runShaderAnimations = void 0;
const setUpAnimationLoop_1 = require("./animation-loop/setUpAnimationLoop");
const snapAnimationLoopOnPause_1 = require("./animation-loop/snapAnimationLoopOnPause");
const runShaderAnimations = (scene, animationProperties, animatedObjects) => {
    let startTime = null;
    let shaderTime = 0;
    let pauseTime = 0; // Track the pause duration
    const { animationDurationMilis, repeatAnimation, snapOnPause, animationPauseMilis, animationLoopConfig, } = animationProperties;
    const duration = animationDurationMilis / 1000;
    const animationLoop = (0, setUpAnimationLoop_1.setUpAnimationLoop)(animationLoopConfig, duration);
    function step(timestamp) {
        // Initialize start time
        if (startTime === null) {
            startTime = timestamp - pauseTime; // Account for any paused time
            pauseTime = 0; // Reset pause time after resuming
            scene.clock.getElapsedTime();
        }
        const progress = timestamp - startTime;
        shaderTime = scene.clock.getElapsedTime();
        // Update all animated objects
        animatedObjects.forEach((animatedObject) => {
            animationLoop(animatedObject, shaderTime);
        });
        if (progress <= animationDurationMilis - 20 ||
            animationDurationMilis === -1) {
            requestAnimationFrame(step);
        }
        else {
            // End of animation cycle
            startTime = null; // Reset startTime for the next cycle
            shaderTime = Math.round(shaderTime);
            if (snapOnPause) {
                animatedObjects.forEach((animatedObject) => {
                    (0, snapAnimationLoopOnPause_1.snapAnimationLoopOnPause)(animationLoopConfig, animatedObject);
                });
            }
            if (repeatAnimation) {
                // Delay the next animation cycle
                setTimeout(() => {
                    pauseTime = animationPauseMilis; // Record the pause duration to account for the delay
                    requestAnimationFrame(step);
                }, animationPauseMilis);
            }
        }
    }
    requestAnimationFrame(step);
};
exports.runShaderAnimations = runShaderAnimations;
