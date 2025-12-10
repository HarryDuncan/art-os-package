// @ts-nocheck
import { useCallback, useEffect, useRef } from "react";
import { useSceneContext } from "../../../context/context";
import { Texture } from "three";
import { InteractionConfig } from "../../../interaction/types";

export const VideoStreamNode = () => {
  const { interactionConfigs } = useSceneContext();

  const selectedInteractionConfig = interactionConfigs.find(
    (interactionConfig) =>
      interactionConfig.output?.outputSchema.some(
        (outputSchema) => outputSchema.id === "stream-texture-config"
      )
  );

  if (!selectedInteractionConfig) {
    return null;
  }
  return <Content interactionConfig={selectedInteractionConfig} />;
};

const Content = ({
  interactionConfig,
}: {
  interactionConfig: InteractionConfig;
}) => {
  const { initializedScene } = useSceneContext();
  const { output } = interactionConfig;
  const schemaData = output?.outputSchema.find(
    (schema) => schema.id === "stream-texture-config"
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // get the mesh

  const selectedMesh = initializedScene?.current?.children.find(
    (mesh) => schemaData?.meshId === mesh.name
  );

  const setFrameAsUniform = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (selectedMesh && schemaData) {
        const offscreenCanvas = document.createElement("canvas");
        const ctx = offscreenCanvas.getContext("2d");
        if (!ctx) {
          return;
        }
        // Swap width and height for 90-degree rotation
        offscreenCanvas.width = canvas.height;
        offscreenCanvas.height = canvas.width;

        // Create a new texture from the rotated offscreen canvas
        const texture = new Texture(canvas);
        texture.needsUpdate = true;

        if (selectedMesh?.material?.uniforms[schemaData.parameterKey]) {
          selectedMesh.material.uniforms[schemaData.parameterKey].value =
            texture;
        }
      }
    },
    [selectedMesh, schemaData]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous"; // Enable cross-origin image loading
    img.src = `http://127.0.0.1:5005/video_feed?quality=60&face_only=true&${Date.now()}`;

    img.onload = () => {
      const updateFrame = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Set canvas content as a Three.js texture
        setFrameAsUniform(canvas);
        requestAnimationFrame(updateFrame);
      };

      updateFrame();
    };
  }, [setFrameAsUniform]);

  return <canvas id="video-stream" ref={canvasRef} width={640} height={320} />;
};

// interactionConfigs.forEach((interactionConfig) => {
//   const { output } = interactionConfig;

//   if (requiresTextureStream) {
//     // Check if video already exists
//     let video = document.getElementById("test") as HTMLVideoElement | null;

//     if (!video) {
//       video = document.createElement("video");
//       video.id = "test";
//       video.crossOrigin = "anonymous";
//       video.autoplay = true;
//       video.muted = true;
//       video.loop = true;
//       video.playsInline = true;
//       video.setAttribute("muted", "true");
//       video.setAttribute("loop", "true");

//       // Use the video stream URL - change extension based on your Flask setup
//       const streamUrl = "127.0.0.1:5005/video_feed";
//       const fullUrl =
//         streamUrl.startsWith("http://") || streamUrl.startsWith("https://")
//           ? streamUrl
//           : `http://${streamUrl}`;
//       video.src = fullUrl;

//       // Add event listeners
//       video.addEventListener("error", (e) => {
//         console.error("Video stream error:", e);
//         console.error("Video error details:", video?.error);
//       });

//       video.addEventListener("loadstart", () => {
//         console.log("Video stream loading started");
//       });

//       video.addEventListener("canplay", () => {
//         console.log("Video stream can play");
//         video?.play().catch((err) => {
//           console.warn("Video autoplay failed:", err);
//         });
//       });

//       video.addEventListener("playing", () => {
//         console.log("Video stream is playing");
//       });

//       video.addEventListener("loadedmetadata", () => {
//         console.log("Video metadata loaded:");
//         console.log("  - Video width:", video?.videoWidth);
//         console.log("  - Video height:", video?.videoHeight);
//         console.log("  - Duration:", video?.duration);
//       });

//       const appendContainer = document.getElementById("append-container");
//       if (appendContainer) {
//         appendContainer.appendChild(video);
//       } else {
//         document.body.appendChild(video);
//       }
//     }
//   }
// });
