import { useSceneContext } from "../../context/context";
import { InteractionConfig } from "../../interaction/interaction.types";
import { useEffect, useRef, useState } from "react";
import { rayTraceCoordinateAsPercentage } from "../../interaction/key-point-extraction/rayTraceCoordinateAsPercentage";
import { setUniforms } from "../../interaction/utils";
import { PROCESS_STATUS } from "../../consts/consts";
import { Scene } from "three";

export const PoseNode = ({ config }: { config: InteractionConfig }) => {
  const eventSourceRef = useRef<EventSource | null>(null);
  const {
    state: { initializedScene, status },
    camera,
  } = useSceneContext();

  const { materialIds } = config;
  const uniformKeys = Object.values(config.mappingTo).flatMap((mapping) =>
    mapping.map((m) => m.parameterKey)
  );
  const [isStreaming, setIsStreaming] = useState(false);
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
                const { x, y } = data.data[0].keypoints[0];

                const { position } = rayTraceCoordinateAsPercentage(
                  { x, y },
                  { camera: camera!, zTarget: 0 }
                );
                console.log("position", position);
                setUniforms(
                  initializedScene as Scene,
                  materialIds ?? [],
                  uniformKeys,
                  { position },
                  "position"
                );
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
    console.log("initializedScene", initializedScene);
    console.log("status", status);
    console.log("isStreaming", isStreaming);
    if (initializedScene && status === PROCESS_STATUS.RUNNING) {
      startStreaming();
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [initializedScene, materialIds, uniformKeys, status, isStreaming, camera]);

  return <div>PoseNode</div>;
};
