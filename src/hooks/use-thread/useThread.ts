import { useCallback, useEffect } from "react";
import { Camera, WebGLRenderer } from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { InteractiveScene } from "../../components/interactive-scene/InteractiveScene";
import { sceneUpdateEvent } from "../../engine/engineEvents";

export const useThread = (
  renderer: WebGLRenderer | CSS3DRenderer | undefined,
  currentFrameRef: React.RefObject<number>,
  scene: InteractiveScene,
  camera: Camera
) => {
  const update = useCallback(() => {
    if (!renderer) {
      console.warn("renderer not defined");
      return;
    }
    sceneUpdateEvent();
    if (scene.orbitControls) {
      scene.orbitControls.update();
    }
    renderer.render(scene, camera);
    currentFrameRef.current = requestAnimationFrame(update);
  }, [currentFrameRef, renderer, scene, camera]);

  const pause = useCallback(() => {
    cancelAnimationFrame(currentFrameRef.current);
  }, [currentFrameRef]);

  useEffect(
    () => () => {
      pause();
    },
    [pause]
  );
  return { update, pause };
};
