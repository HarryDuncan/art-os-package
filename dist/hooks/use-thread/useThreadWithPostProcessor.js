import { useCallback, useEffect, useRef } from "react";
import PostProcessor from "../../components/post-processor/PostProcessor";
import { sceneUpdateEvent } from "../../engine/engineEvents";
import { useSceneContext } from "../../context/context";
export const useThreadWithPostProcessor = (currentFrameRef, camera, renderer, passes) => {
    const { state: { initializedScene }, } = useSceneContext();
    const postProcessor = useRef(null);
    const update = useCallback(() => {
        var _a;
        sceneUpdateEvent();
        if (initializedScene) {
            if (initializedScene === null || initializedScene === void 0 ? void 0 : initializedScene.orbitControls) {
                initializedScene.orbitControls.update();
            }
            if (initializedScene === null || initializedScene === void 0 ? void 0 : initializedScene.animationManager.hasCameraAnimations()) {
                initializedScene.animationManager.startCameraAnimation(camera);
            }
        }
        // @ts-ignore
        (_a = postProcessor.current) === null || _a === void 0 ? void 0 : _a.render(performance.now());
        currentFrameRef.current = requestAnimationFrame(update);
        return () => {
            cancelAnimationFrame(currentFrameRef.current);
        };
    }, [currentFrameRef, postProcessor, camera, initializedScene]);
    const pause = useCallback(() => {
        cancelAnimationFrame(currentFrameRef.current);
    }, [currentFrameRef]);
    useEffect(() => {
        if (initializedScene && camera && renderer && !postProcessor.current) {
            postProcessor.current = new PostProcessor({
                renderer,
                scene: initializedScene,
                camera,
                passes,
            });
        }
    }, [initializedScene, camera, renderer, postProcessor, passes]);
    const initializeSceneWithData = useCallback(() => {
        if (postProcessor.current) {
            update();
        }
    }, [update, postProcessor]);
    useEffect(() => {
        initializeSceneWithData();
        return () => {
            pause();
        };
    }, [initializeSceneWithData, pause]);
};
