import { useEffect } from "react";
import { SRGBColorSpace, WebGLRenderer } from "three";
import { useRendererSize } from "../hooks/useRendererSize";
import { DEFAULT_RENDERER_PARAMS } from "../rendererConstants";
import { RendererParams } from "../renderer.types";
import { SceneProperties } from "../../../..";
import {
  getSceneHeight,
  getSceneWidth,
} from "../../../../utils/scene-properties";
import { useSceneContext } from "../../../../context/context";
import { logWebGLGpuInfo } from "../../../../utils/logWebGLGpuInfo";

import { packageConsole } from "../../../../utils/packageConsole";
export const useWebGLRenderer = (
  sceneProperties: SceneProperties,
  rendererParams: RendererParams = DEFAULT_RENDERER_PARAMS as RendererParams
) => {
  const { setRenderer, renderer } = useSceneContext();
  const { width, height, devicePixelRatio, screenType } =
    useRendererSize(rendererParams);

  useEffect(() => {
    if (!renderer) {
      packageConsole.log("[WebGL] creating Three.js WebGLRenderer", {
        powerPreference: "high-performance",
        antialias: true,
        screenType,
        width,
        height,
        devicePixelRatio,
      });
      const nextRenderer = new WebGLRenderer({
        powerPreference: "high-performance",
        antialias: true,
      });
      nextRenderer.setClearColor(0x112233, 0);
      nextRenderer.outputColorSpace =
        rendererParams.outputColorSpace ?? SRGBColorSpace;

      const gl = nextRenderer.getContext();
      logWebGLGpuInfo(gl, "Three.js WebGLRenderer", {
        powerPreference: "high-performance",
        screenType,
      });

      const canvas = nextRenderer.domElement;
      canvas.addEventListener("webglcontextlost", (event) => {
        packageConsole.warn("[WebGL] Three.js canvas webglcontextlost", {
          defaultPrevented: event.defaultPrevented,
          timeStamp: event.timeStamp,
        });
      });
      canvas.addEventListener("webglcontextrestored", () => {
        packageConsole.log("[WebGL] Three.js canvas webglcontextrestored");
        logWebGLGpuInfo(nextRenderer.getContext(), "Three.js after restore");
      });

      setRenderer(nextRenderer);
    }
  }, [rendererParams]);

  // Update size when dimensions change
  useEffect(() => {
    if (renderer) {
      const rendererWidth = getSceneWidth(sceneProperties, width);
      const rendererHeight = getSceneHeight(sceneProperties, height);
      packageConsole.log("[WebGL] Three.js setSize", {
        rendererWidth,
        rendererHeight,
        devicePixelRatio,
        screenType,
      });
      renderer.setPixelRatio(devicePixelRatio ?? 1);
      renderer.setSize(rendererWidth, rendererHeight);
    }
  }, [renderer, width, height, devicePixelRatio, sceneProperties]);

  // Cleanup renderer on unmount to prevent WebGL context leaks
  useEffect(() => {
    return () => {
      if (renderer) {
        packageConsole.warn(
          "[WebGL] useWebGLRenderer cleanup disposing renderer (deps: renderer/screenType)",
          { screenType },
        );
        renderer.dispose();
      }
    };
  }, [renderer, screenType]);

  return renderer;
};
