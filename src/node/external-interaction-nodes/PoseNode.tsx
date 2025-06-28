import { useSceneContext } from "../../context/context";
import { InteractionConfig } from "../../interaction/interaction.types";
import { useEffect, useRef } from "react";
import { rayTraceCoordinateAsPercentage } from "../../interaction/key-point-extraction/rayTraceCoordinateAsPercentage";

export const PoseNode = ({ config }: { config: InteractionConfig }) => {
  const eventSourceRef = useRef<EventSource | null>(null);
  const {
    state: { initializedScene },
    camera,
    rendererHeight,
    rendererWidth,
  } = useSceneContext();
  const { materialIds } = config;
  const uniformKeys = Object.values(config.mappingTo).flatMap((mapping) =>
    mapping.map((m) => m.parameterKey)
  );
  useEffect(() => {
    const startStreaming = () => {
      try {
        const eventSource = new EventSource(
          "http://127.0.0.1:5000/keypoint_stream"
        );
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
          console.log("Stream connected");
        };

        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "keypoints") {
              if (data.data.length) {
                console.log("Keypoint data:", data.data[0].keypoints);
                const { x, y } = data.data[0].keypoints[0];

                const meshes = initializedScene?.children.flatMap((child) => {
                  if (child) {
                    return materialIds?.includes(child?.material?.name)
                      ? child
                      : [];
                  }
                  return [];
                });

                const { position } = rayTraceCoordinateAsPercentage(
                  { x, y },
                  { camera: camera!, zTarget: 0, rendererHeight, rendererWidth }
                );
                console.log("position", position);
                meshes?.forEach((mesh) => {
                  const uniforms = mesh?.material?.uniforms;
                  if (uniforms) {
                    console.log("uniforms", uniforms);
                    uniformKeys.forEach((uniformKey) => {
                      if (uniforms[uniformKey]) {
                        uniforms[uniformKey].value = position;
                      }
                    });
                  }
                });
              }
            }
          } catch (error) {
            console.error("Error parsing stream data:", error);
          }
        };

        eventSource.onerror = (error) => {
          console.error("Stream error:", error);
        };
      } catch (error) {
        console.error("Error starting stream:", error);
      }
    };

    startStreaming();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [initializedScene, materialIds, uniformKeys]);

  return <div>PoseNode</div>;
};
