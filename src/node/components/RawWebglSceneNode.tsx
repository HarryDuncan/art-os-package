import { useRef } from "react";
import { Asset } from "../../assets/types";
import { MeshTransformConfig } from "../../config/config.types";
import { RawWebglShaderMaterial } from "../../config/material/shaders/raw-webgl/types";
import { useRawWebglRenderer } from "./raw-webgl/useRawWebglRenderer";

// Scene node for the `webgl` engine, parallel to `SceneDisplay` for the
// three.js engine. Renders a fullscreen <canvas> and drives the raw-WebGL
// render loop via `useRawWebglRenderer`.
export const RawWebglSceneNode = ({
  shaderMaterial,
  assets,
  meshTransforms,
}: {
  shaderMaterial: RawWebglShaderMaterial;
  assets: Asset[];
  meshTransforms?: MeshTransformConfig[];
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useRawWebglRenderer(canvasRef, shaderMaterial, assets, meshTransforms);

  // TODO: Apply scene properties (viewWidth, viewHeight, backgroundColor,
  //       videoBackground, position, zIndex, etc.) - mirroring
  //       `RootContainer.tsx`. Currently the canvas is fullscreen.

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
      }}
    />
  );
};
