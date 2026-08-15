import { memo, useRef } from "react";
import { Asset } from "../../assets/types";
import {
  MeshTransformConfig,
  SceneProperties,
} from "../../config/config.types";
import {
  RawWebglClearColor,
  RawWebglShaderMaterial,
} from "../../config/material/shaders/raw-webgl/types";
import { useRawWebglRenderer } from "./raw-webgl/useRawWebglRenderer";
import { VideoBackground } from "../root/video-background/VideoBackground";

// Scene node for the `webgl` engine, parallel to `SceneDisplay` for the
// three.js engine. Renders a fullscreen <canvas> and drives the raw-WebGL
// render loop via `useRawWebglRenderer`.
//
// Wrapped in React.memo so context updates higher in the tree don't cause
// this component to re-evaluate its JSX. Re-renders here are pure waste —
// the canvas only needs to mount once and the rAF loop owns the GL state
// for the rest of its lifetime.
export const RawWebglSceneNode = memo(function RawWebglSceneNode({
  shaderMaterial,
  assets,
  meshTransforms,
  sceneProperties,
  clearColor,
}: {
  shaderMaterial: RawWebglShaderMaterial | null;
  assets: Asset[];
  meshTransforms?: MeshTransformConfig[];
  sceneProperties?: SceneProperties | null;
  clearColor?: RawWebglClearColor;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useRawWebglRenderer(
    canvasRef,
    shaderMaterial,
    assets,
    meshTransforms,
    clearColor,
  );

  console.log("sceneProperties", sceneProperties);
  // TODO: Apply remaining scene properties (viewWidth, viewHeight,
  //       backgroundColor, position, zIndex, etc.) - mirroring
  //       `RootContainer.tsx`. Currently the canvas is fullscreen.

  return (
    <>
      {shaderMaterial && (
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "block",
            cursor: "none",
          }}
        />
      )}
      <VideoBackground videoSrc={sceneProperties?.videoBackground} />
    </>
  );
});
