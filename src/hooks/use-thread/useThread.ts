import { useCallback, useEffect, useRef } from "react";
import { Camera, WebGLRenderer } from "three";
import { InteractiveScene } from "../../components/interactive-scene/InteractiveScene";
import { sceneUpdateEvent } from "../../engine/engineEvents";

export const useThread = (
  renderer: WebGLRenderer | any | undefined,
  currentFrameRef: React.RefObject<number>,
  scene: InteractiveScene,
  camera: Camera
) => {
  const update = useCallback(async () => {
    if (!renderer) {
      console.warn("renderer not defined");
      return;
    }
    sceneUpdateEvent();
    if (scene.orbitControls) {
      scene.orbitControls.update();
    }

    const { CSS3DRenderer } = await import(
      "three/examples/jsm/renderers/CSS3DRenderer.js"
    );
    if (renderer instanceof CSS3DRenderer) {
      renderer.render(scene, camera);
    } else {
      renderer.render(scene, camera);
    }
    currentFrameRef.current = requestAnimationFrame(update);
  }, [currentFrameRef, renderer, scene, camera]);

  const pause = useCallback(() => {
    cancelAnimationFrame(currentFrameRef.current);
  }, [currentFrameRef]);

  useEffect(() => {
    currentFrameRef.current = requestAnimationFrame(update);
    return () => {
      if (currentFrameRef.current) {
        cancelAnimationFrame(currentFrameRef.current);
      }
    };
  }, [currentFrameRef, update]);

  return { update, pause };
};
