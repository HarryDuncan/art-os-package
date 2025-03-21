"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThreeJs = void 0;
const react_1 = require("react");
const useInitializeNode_1 = require("../use-initialize-node/useInitializeNode");
const renderer_1 = require("./renderer");
const use_css_renderer_1 = require("./renderer/use-css-renderer");
const useOrbitControls_1 = require("./use-orbit-controls/useOrbitControls");
const useThreeJs = (threeJsParams) => {
    const { camera } = threeJsParams;
    const container = (0, react_1.useRef)(null);
    const currentFrameRef = (0, react_1.useRef)(0);
    const renderer = (0, renderer_1.useWebGLRenderer)(threeJsParams.renderer);
    const cssRenderer = (0, use_css_renderer_1.useCssRenderer)(threeJsParams.renderer);
    (0, useInitializeNode_1.useInitializeNode)(container, cssRenderer || renderer);
    const orbitControls = (0, useOrbitControls_1.useOrbitControls)(camera, renderer, threeJsParams === null || threeJsParams === void 0 ? void 0 : threeJsParams.controls);
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
exports.useThreeJs = useThreeJs;
