import { ShaderMeshObject } from "../../../config/mesh/types";
import { AnimatedScene, ShaderAnimationConfig } from "../../animation.types";
import { setUpAnimationLoop } from "./animation-loop/setUpAnimationLoop";
import { snapAnimationLoopOnPause } from "./animation-loop/snapAnimationLoopOnPause";

export const runShaderAnimations = (
  scene: AnimatedScene,
  animationProperties: ShaderAnimationConfig,
  animatedObjects: ShaderMeshObject[]
) => {
  let startTime: number | null = null;
  let shaderTime = 0;
  let pauseTime = 0; // Track the pause duration

  const {
    animationDurationMilis,
    repeatAnimation,
    snapOnPause,
    animationPauseMilis,
    animationLoopConfig,
  } = animationProperties;

  const duration = animationDurationMilis / 1000;
  const animationLoop = setUpAnimationLoop(
    animationLoopConfig,

    duration
  );

  function step(timestamp: number) {
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

    if (
      progress <= animationDurationMilis - 20 ||
      animationDurationMilis === -1
    ) {
      requestAnimationFrame(step);
    } else {
      // End of animation cycle
      startTime = null; // Reset startTime for the next cycle
      shaderTime = Math.round(shaderTime);

      if (snapOnPause) {
        animatedObjects.forEach((animatedObject) => {
          snapAnimationLoopOnPause(animationLoopConfig, animatedObject);
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
