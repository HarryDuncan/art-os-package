"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCssRenderer = void 0;
const react_1 = require("react");
const CSS3DRenderer_1 = require("three/examples/jsm/renderers/CSS3DRenderer");
const rendererConstants_1 = require("../rendererConstants");
const useRendererSize_1 = require("../hooks/useRendererSize");
const useCssRenderer = (rendererParams = rendererConstants_1.DEFAULT_RENDERER_PARAMS) => {
    const { width, height } = (0, useRendererSize_1.useRendererSize)(rendererParams);
    return (0, react_1.useMemo)(() => {
        if (rendererParams.rendererType === rendererConstants_1.RENDERER_TYPES.CSS) {
            const renderer = new CSS3DRenderer_1.CSS3DRenderer();
            renderer.setSize(width, height);
            return renderer;
        }
    }, [rendererParams, width, height]);
};
exports.useCssRenderer = useCssRenderer;
