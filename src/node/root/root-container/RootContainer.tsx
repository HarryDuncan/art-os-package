import { MutableRefObject } from "react";
import { VideoBackground } from "../video-background/VideoBackground";
import { SceneProperties } from "../../../types/config.types";

interface IRootContainerProps {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  sceneProperties: SceneProperties;
}

export const RootContainer = ({
  containerRef,
  sceneProperties,
}: IRootContainerProps) => {
  return (
    <div
      style={{
        height: sceneProperties.viewHeight,
        width: sceneProperties.viewWidth,
        overflow: "hidden",
        margin: "0 auto",
        cursor: sceneProperties.cursor ?? "pointer",
        position: sceneProperties.position as
          | "relative"
          | "absolute"
          | "fixed"
          | "sticky"
          | undefined,
        backgroundColor: sceneProperties.backgroundColor ?? "transparent",
        backgroundImage: sceneProperties.backgroundUrl
          ? `url(${sceneProperties.backgroundUrl})`
          : "none",
        backgroundSize: "cover",
      }}
      ref={containerRef}
    >
      <VideoBackground videoSrc={sceneProperties.videoBackground} />
    </div>
  );
};
