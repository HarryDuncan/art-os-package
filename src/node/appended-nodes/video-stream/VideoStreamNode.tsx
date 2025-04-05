/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useCallback, useEffect, useRef } from "react";
import { VideoStreamNodeProps } from "../appendedNodes.types";
import { useSceneContext } from "../../../context/context";
import { getSceneElementByName } from "../../../utils/scene/getSceneElementByName";
import { Texture } from "three";

export const VideoStreamNode = ({
  src,
  meshTargetIdentifier,
  uniformValue,
}: VideoStreamNodeProps) => {
  const {
    state: { initializedScene },
  } = useSceneContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textureRef = useRef<Texture | null>(null);

  const setFrameAsUniform = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (initializedScene) {
        const animatedObjects = getSceneElementByName(
          initializedScene,
          meshTargetIdentifier
        );

        if (animatedObjects && animatedObjects.length) {
          const offscreenCanvas = document.createElement("canvas");
          const ctx = offscreenCanvas.getContext("2d");

          if (!ctx) return;

          // Swap width and height for 90-degree rotation
          offscreenCanvas.width = canvas.height;
          offscreenCanvas.height = canvas.width;

          // Apply rotation transformation
          //  ctx.translate(offscreenCanvas.width / 2, offscreenCanvas.height / 2);
          //  ctx.rotate(Math.PI / 2); // 90 degrees
          //  ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

          // Dispose of the previous texture
          if (textureRef.current) {
            textureRef.current.dispose();
            textureRef.current = null;
          }

          // Create a new texture from the rotated offscreen canvas
          const texture = new Texture(canvas);
          texture.needsUpdate = true;
          if (animatedObjects[0]?.material?.uniforms[uniformValue]) {
            animatedObjects[0].material.uniforms[uniformValue].value = texture;
          }
        }
      }
    },
    [initializedScene, uniformValue, meshTargetIdentifier]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous"; // Enable cross-origin image loading
    img.src = src;

    img.onload = () => {
      const updateFrame = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Set canvas content as a Three.js texture
        setFrameAsUniform(canvas);

        // Schedule the next frame update
        requestAnimationFrame(updateFrame);
      };

      updateFrame();
    };
  }, [src, setFrameAsUniform]);

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (textureRef.current) {
        textureRef.current.dispose();
        textureRef.current = null;
      }
    };
  }, []);
  return <canvas id="video-stream" ref={canvasRef} width={360} height={640} />;
};
