import { useMemo } from "react";
import { SRGBColorSpace, WebGLRenderer } from "three";
import { useRendererSize } from "../hooks/useRendererSize";
import { DEFAULT_RENDERER_PARAMS } from "../rendererConstants";
import { RendererParams } from "../renderer.types";
import { useWindowState } from "../../../../compat/window-state/windowStateProvider";

export const useWebGLRenderer = (
  rendererParams: RendererParams = DEFAULT_RENDERER_PARAMS as RendererParams
) => {
  const {
    state: { devicePixelRatio },
  } = useWindowState();
  const { width, height } = useRendererSize(rendererParams);
  return useMemo(() => {
    const renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
    });
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x112233, 0);
    renderer.outputColorSpace =
      rendererParams.outputColorSpace ?? SRGBColorSpace;
    return renderer;
  }, [rendererParams, width, height, devicePixelRatio]);
};
