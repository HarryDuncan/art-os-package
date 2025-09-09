import { MutableRefObject, useCallback, useRef } from "react";
import { Camera, Scene, Texture, WebGLRenderer } from "three";
import { sceneUpdateEvent } from "../threadEvents";
import { useSceneContext } from "../../context/context";
import { framePingPong } from "../../post-processing/framePingPong";
import { PingPongRenderTargetConfig } from "../../config/post-effects/findPostEffectTransforms";

export interface PostEffectChainRuntimeConfig {
  currentFrameRef: MutableRefObject<number>;
  renderer: WebGLRenderer | null;
  postEffects: PingPongRenderTargetConfig[];
}

export interface PingPongInstance {
  render: () => void;
  getCurrentTexture: () => Texture;
  dispose: () => void;
}

export const usePostEffectChainRuntime = ({
  currentFrameRef,
  renderer,
  postEffects,
}: PostEffectChainRuntimeConfig) => {
  const { initializedScene, camera } = useSceneContext();

  // Store ping-pong instances in a ref to avoid recreating them on every render
  const pingPongInstancesRef = useRef<PingPongInstance[]>([]);
  const isInitializedRef = useRef(false);

  // Initialize ping-pong instances
  const initializePingPongInstances = useCallback((): PingPongInstance[] => {
    if (
      !initializedScene.current ||
      !camera.current ||
      postEffects.length === 0 ||
      !renderer
    ) {
      return [];
    }

    const width = renderer.domElement.clientWidth;
    const height = renderer.domElement.clientHeight;

    return postEffects.map((postEffect) => {
      return {
        render: () => {
          framePingPong(renderer, postEffect.materialId, width, height).render(
            initializedScene.current as Scene,
            camera.current as Camera
          );
        },
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
  }, [initializedScene, camera, renderer, postEffects]);

  // Render function that handles the post effect chain
  const renderWithPostEffects = useCallback(() => {
    if (
      postEffects.length === 0 &&
      initializedScene.current &&
      camera.current &&
      renderer
    ) {
      // No post effects, use normal rendering
      renderer.render(
        initializedScene.current as Scene,
        camera.current as Camera
      );
      return;
    }

    // Initialize ping-pong instances if not already done
    if (!isInitializedRef.current) {
      pingPongInstancesRef.current = initializePingPongInstances();
      isInitializedRef.current = true;
    }

    // Handle post effect chain rendering
    if (pingPongInstancesRef.current.length > 0) {
      pingPongInstancesRef.current[0].render();
    }
  }, [
    postEffects.length,
    renderer,
    initializedScene,
    camera,
    initializePingPongInstances,
  ]);

  const update = useCallback(() => {
    sceneUpdateEvent();

    if (initializedScene.current) {
      if (initializedScene.current?.orbitControls) {
        initializedScene.current.orbitControls.update();
      }
      if (initializedScene.current?.animationManager.hasCameraAnimations()) {
        initializedScene.current.animationManager.startCameraAnimation(
          camera.current!
        );
      }

      // Use post effect rendering
      renderWithPostEffects();
    }

    currentFrameRef.current = requestAnimationFrame(update);
  }, [currentFrameRef, camera, initializedScene, renderWithPostEffects]);

  const pause = useCallback(() => {
    cancelAnimationFrame(currentFrameRef.current);
  }, [currentFrameRef]);

  // Cleanup function to dispose of ping-pong instances
  const cleanup = useCallback(() => {
    pingPongInstancesRef.current.forEach((instance) => {
      instance.dispose();
    });
    pingPongInstancesRef.current = [];
    isInitializedRef.current = false;
  }, []);

  return { update, pause, cleanup };
};
