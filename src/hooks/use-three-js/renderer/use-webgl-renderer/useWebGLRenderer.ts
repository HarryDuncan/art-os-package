import { useMemo, useEffect } from "react";
import { SRGBColorSpace, WebGLRenderer } from "three";
import { useRendererSize } from "../hooks/useRendererSize";
import { DEFAULT_RENDERER_PARAMS } from "../rendererConstants";
import { RendererParams } from "../renderer.types";

export const useWebGLRenderer = (
  rendererParams: RendererParams = DEFAULT_RENDERER_PARAMS as RendererParams
) => {
  const { width, height, devicePixelRatio, screenType } =
    useRendererSize(rendererParams);

  // Create renderer once
  const renderer = useMemo(() => {
    const renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
    });
    renderer.setClearColor(0x112233, 0);
    renderer.outputColorSpace =
      rendererParams.outputColorSpace ?? SRGBColorSpace;
    return renderer;
  }, [rendererParams]);

  // Update size when dimensions change
  useEffect(() => {
    if (renderer) {
      renderer.setPixelRatio(devicePixelRatio ?? 1);
      renderer.setSize(width, height);
    }
  }, [renderer, width, height, devicePixelRatio]);

  // Cleanup renderer on unmount to prevent WebGL context leaks
  useEffect(() => {
    return () => {
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [renderer, screenType]);

  return renderer;
};
