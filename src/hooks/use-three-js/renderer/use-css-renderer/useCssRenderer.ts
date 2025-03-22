import { useMemo } from "react";
import { RendererParams } from "../../renderer/renderer.types";

export const useCssRenderer = (rendererParams?: RendererParams) => {
  return useMemo(async () => {
    const { CSS3DRenderer } = await import(
      "three/examples/jsm/renderers/CSS3DRenderer.js"
    );
    const renderer = new CSS3DRenderer();
    if (rendererParams?.size) {
      renderer.setSize(rendererParams.size.width, rendererParams.size.height);
    }
    return renderer;
  }, [rendererParams]);
};
