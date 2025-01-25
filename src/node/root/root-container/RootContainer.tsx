import React from "react";
import { Root } from "./RootContainer.styles";
import { VideoBackground } from "../video-background/VideoBackground";
import { Layer } from "../../../components/layers/types";
import { Layers } from "../../../components/layers/Layers";
import { SceneProperties } from "../../../config/config.types";

interface IRootContainerProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  sceneProperties: SceneProperties;
  layers?: Layer[];
}

export const RootContainer = ({
  containerRef,
  sceneProperties,
  layers = [],
}: IRootContainerProps) => {
  return (
    <>
      <Layers layers={layers} />
      <Root
        $position={sceneProperties.position}
        $height={sceneProperties.viewHeight}
        $width={sceneProperties.viewWidth}
        $fixed={sceneProperties.fixed}
        ref={containerRef}
        $cursor={sceneProperties.cursor}
        $backgroundColor={sceneProperties.backgroundColor}
        $backgroundUrl={sceneProperties.backgroundUrl}
      >
        <VideoBackground videoSrc={sceneProperties.videoBackground} />
      </Root>
    </>
  );
};
