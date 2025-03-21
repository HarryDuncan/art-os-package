import { useMemo } from "react";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { DEFAULT_RENDERER_PARAMS, RENDERER_TYPES } from "../rendererConstants";
import { useRendererSize } from "../hooks/useRendererSize";
export const useCssRenderer = (rendererParams = DEFAULT_RENDERER_PARAMS) => {
    const { width, height } = useRendererSize(rendererParams);
    return useMemo(() => {
        if (rendererParams.rendererType === RENDERER_TYPES.CSS) {
            const renderer = new CSS3DRenderer();
            renderer.setSize(width, height);
            return renderer;
        }
    }, [rendererParams, width, height]);
};
