import { useCallback, useEffect } from "react";
import { sceneUpdateEvent } from "../../engine/engineEvents";
export const useThread = (renderer, currentFrameRef, scene, camera) => {
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
    useEffect(() => () => {
        pause();
    }, [pause]);
    return { update, pause };
};
