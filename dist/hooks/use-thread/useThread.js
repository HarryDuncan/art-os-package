"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThread = void 0;
const react_1 = require("react");
const engineEvents_1 = require("../../engine/engineEvents");
const useThread = (renderer, currentFrameRef, scene, camera) => {
    const update = (0, react_1.useCallback)(() => {
        if (!renderer) {
            console.warn("renderer not defined");
            return;
        }
        (0, engineEvents_1.sceneUpdateEvent)();
        if (scene.orbitControls) {
            scene.orbitControls.update();
        }
        renderer.render(scene, camera);
        currentFrameRef.current = requestAnimationFrame(update);
    }, [currentFrameRef, renderer, scene, camera]);
    const pause = (0, react_1.useCallback)(() => {
        cancelAnimationFrame(currentFrameRef.current);
    }, [currentFrameRef]);
    (0, react_1.useEffect)(() => () => {
        pause();
    }, [pause]);
    return { update, pause };
};
exports.useThread = useThread;
