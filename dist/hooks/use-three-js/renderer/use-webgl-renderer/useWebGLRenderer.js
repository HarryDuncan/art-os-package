import { useMemo } from "react";
import { SRGBColorSpace, WebGLRenderer } from "three";
import { useRendererSize } from "../hooks/useRendererSize";
import { DEFAULT_RENDERER_PARAMS } from "../rendererConstants";
import { useWindowState } from "../../../../compat/window-state/windowStateProvider";
export const useWebGLRenderer = (rendererParams = DEFAULT_RENDERER_PARAMS) => {
    const { state: { devicePixelRatio }, } = useWindowState();
    const { width, height } = useRendererSize(rendererParams);
    return useMemo(() => {
        var _a;
        const renderer = new WebGLRenderer({
            powerPreference: "high-performance",
            antialias: true,
        });
        renderer.setPixelRatio(devicePixelRatio);
        renderer.setSize(width, height);
        renderer.setClearColor(0x112233, 0);
        renderer.outputColorSpace =
            (_a = rendererParams.outputColorSpace) !== null && _a !== void 0 ? _a : SRGBColorSpace;
        return renderer;
    }, [rendererParams, width, height, devicePixelRatio]);
};
