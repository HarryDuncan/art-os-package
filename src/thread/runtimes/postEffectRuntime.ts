//  @ ts-nocheck

import { MutableRefObject, useCallback } from "react";
import { Camera, Scene, Texture, WebGLRenderer } from "three";
import { sceneUpdateEvent } from "../threadEvents";
import { useSceneContext } from "../../context/context";
import { framePingPong } from "../../post-processing/framePingPong";
import { PingPongRenderTargetConfig } from "../../config/post-effects/findPostEffectTransforms";

export interface PostEffectRuntimeConfig {
  currentFrameRef: MutableRefObject<number>;
  renderer: WebGLRenderer;
  postEffects: PingPongRenderTargetConfig[];
}

export interface PingPongInstance {
  render: (scene: Scene, camera: Camera) => void;
  getCurrentTexture: () => Texture;
  dispose: () => void;
}

export const usePostEffectRuntime = ({
  currentFrameRef,
  renderer,
  postEffects,
}: PostEffectRuntimeConfig) => {
  const {
    state: { initializedScene },
    camera,
  } = useSceneContext();

  // Create ping-pong instances for each post effect
  const createPingPongInstances = useCallback((): PingPongInstance[] => {
    if (!initializedScene || !camera || postEffects.length === 0) {
      return [];
    }

    const width = renderer.domElement.clientWidth;
    const height = renderer.domElement.clientHeight;

    return postEffects.map((postEffect) => {
      return {
        render: framePingPong(renderer, postEffect.materialId, width, height)
          .render,
        getCurrentTexture: () => {
          return framePingPong(
            renderer,
            postEffect.materialId,
            width,
            height
          ).getCurrentTexture();
        },
        dispose: () => {
          return framePingPong(
            renderer,
            postEffect.materialId,
            width,
            height
          ).dispose();
        },
      };
    });
  }, [renderer, postEffects]);

  const update = useCallback(() => {
    sceneUpdateEvent();

    if (initializedScene) {
      if (initializedScene?.orbitControls) {
        initializedScene.orbitControls.update();
      }
      if (initializedScene?.animationManager.hasCameraAnimations()) {
        initializedScene.animationManager.startCameraAnimation(camera!);
      }

      // If we have post effects, use the first ping-pong instance for rendering
      if (postEffects.length > 0) {
        const pingPongInstances = createPingPongInstances();
        if (pingPongInstances.length > 0) {
          // Use the first ping-pong instance for rendering
          pingPongInstances[0].render(
            initializedScene! as Scene,
            camera! as Camera
          );
        }
      } else {
        // Fallback to normal rendering
        renderer.render(initializedScene, camera!);
      }
    }

    currentFrameRef.current = requestAnimationFrame(update);
  }, [
    currentFrameRef,
    camera,
    initializedScene,
    renderer,
    postEffects,
    createPingPongInstances,
  ]);

  const pause = useCallback(() => {
    cancelAnimationFrame(currentFrameRef.current);
  }, [currentFrameRef]);

  return { update, pause };
};
