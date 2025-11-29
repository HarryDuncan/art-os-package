import { MutableRefObject } from "react";
import { VideoBackground } from "../video-background/VideoBackground";
import { SceneProperties } from "../../../config/config.types";

interface IRootContainerProps {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  sceneProperties: SceneProperties;
}
// @ TODO - make a component that can overlay on top of the scene,
// and I can have components in there - but pointer events pass through so orbit controls ect still work

export const RootContainer = ({
  containerRef,
  sceneProperties,
}: IRootContainerProps) => {
  return (
    <>
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
          zIndex: "9999",
        }}
        ref={containerRef}
      >
        <VideoBackground videoSrc={sceneProperties.videoBackground} />
      </div>
      <div
        id="append-container"
        style={{
          zIndex: -1,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </>
  );
};
