"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThreadWithPostProcessor = void 0;
const react_1 = require("react");
const PostProcessor_1 = __importDefault(require("../../components/post-processor/PostProcessor"));
const engineEvents_1 = require("../../engine/engineEvents");
const context_1 = require("../../context/context");
const useThreadWithPostProcessor = (currentFrameRef, camera, renderer, _passes) => {
    const { state: { initializedScene }, } = (0, context_1.useSceneContext)();
    const postProcessor = (0, react_1.useRef)(null);
    const update = (0, react_1.useCallback)(() => {
        var _a;
        (0, engineEvents_1.sceneUpdateEvent)();
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
    const pause = (0, react_1.useCallback)(() => {
        cancelAnimationFrame(currentFrameRef.current);
    }, [currentFrameRef]);
    (0, react_1.useEffect)(() => {
        if (initializedScene && camera && renderer && !postProcessor.current) {
            postProcessor.current = new PostProcessor_1.default(camera, initializedScene, renderer);
        }
    }, [initializedScene, camera, renderer, postProcessor]);
    const initializeSceneWithData = (0, react_1.useCallback)(() => {
        if (postProcessor.current) {
            update();
        }
    }, [update, postProcessor]);
    (0, react_1.useEffect)(() => {
        initializeSceneWithData();
        return () => {
            pause();
        };
    }, [initializeSceneWithData, pause]);
};
exports.useThreadWithPostProcessor = useThreadWithPostProcessor;
