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

  const setFrameAsUniform = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (initializedScene) {
        const animatedObjects = getSceneElementByName(
          initializedScene,
          meshTargetIdentifier
        );

        if (animatedObjects && animatedObjects.length) {
          const texture = new Texture(canvas); // Create texture from the canvas
          texture.needsUpdate = true; // Mark texture as needing an update
          if (animatedObjects[0].material.uniforms[uniformValue]) {
            animatedObjects[0].material.uniforms[uniformValue].value = texture;
          }
        }
      }
    },
    [initializedScene, meshTargetIdentifier]
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

  return (
    <canvas
      id="video-stream"
      ref={canvasRef}
      width={640}
      height={360}
      style={{ width: "100%", border: "1px solid #ccc" }}
    />
  );
};
