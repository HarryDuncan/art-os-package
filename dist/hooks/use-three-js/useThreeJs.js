import { useRef } from "react";
import { useInitializeNode } from "../use-initialize-node/useInitializeNode";
import { useWebGLRenderer } from "./renderer";
import { useCssRenderer } from "./renderer/use-css-renderer";
import { useOrbitControls } from "./use-orbit-controls/useOrbitControls";
export const useThreeJs = (threeJsParams) => {
    const { camera } = threeJsParams;
    const container = useRef(null);
    const currentFrameRef = useRef(0);
    const renderer = useWebGLRenderer(threeJsParams.renderer);
    const cssRenderer = useCssRenderer(threeJsParams.renderer);
    useInitializeNode(container, cssRenderer || renderer);
    const orbitControls = useOrbitControls(camera, renderer, threeJsParams === null || threeJsParams === void 0 ? void 0 : threeJsParams.controls);
    return {
        container,
        renderer,
        camera,
        currentFrameRef,
        threeJsInitialized: true,
        cssRenderer,
        orbitControls,
    };
};
