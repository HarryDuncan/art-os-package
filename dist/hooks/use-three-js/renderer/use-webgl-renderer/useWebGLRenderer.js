"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWebGLRenderer = void 0;
const react_1 = require("react");
const three_1 = require("three");
const useRendererSize_1 = require("../hooks/useRendererSize");
const rendererConstants_1 = require("../rendererConstants");
const windowStateProvider_1 = require("../../../../compat/window-state/windowStateProvider");
const useWebGLRenderer = (rendererParams = rendererConstants_1.DEFAULT_RENDERER_PARAMS) => {
    const { state: { devicePixelRatio }, } = (0, windowStateProvider_1.useWindowState)();
    const { width, height } = (0, useRendererSize_1.useRendererSize)(rendererParams);
    return (0, react_1.useMemo)(() => {
        var _a;
        const renderer = new three_1.WebGLRenderer({
            powerPreference: "high-performance",
            antialias: true,
        });
        renderer.setPixelRatio(devicePixelRatio);
        renderer.setSize(width, height);
        renderer.setClearColor(0x112233, 0);
        renderer.outputColorSpace =
            (_a = rendererParams.outputColorSpace) !== null && _a !== void 0 ? _a : three_1.SRGBColorSpace;
        return renderer;
    }, [rendererParams, width, height, devicePixelRatio]);
};
exports.useWebGLRenderer = useWebGLRenderer;
