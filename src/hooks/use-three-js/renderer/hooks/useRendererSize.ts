import { useWindowState } from "../../../../compat/window-state/windowStateProvider";
import { RendererParams } from "../renderer.types";
import { useMemo } from "react";

export const useRendererSize = (rendererParams: RendererParams) => {
  const {
    state: {
      windowSize: { width, height },
      devicePixelRatio,
      screenType,
    },
  } = useWindowState();
  const { size } = rendererParams;

  return useMemo(() => {
    if (size) return { width: size.width, height: size.height };
    return { width, height, devicePixelRatio, screenType };
  }, [screenType, size, width, height, devicePixelRatio]);
};
