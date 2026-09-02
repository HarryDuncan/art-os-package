import { MutableRefObject } from "react";
import { FormattedSceneProperties } from "../../../config/config.types";
import { getRootContainerStyles } from "./getRootContainerStyles";

interface IRootContainerProps {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  sceneProperties: FormattedSceneProperties;
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
        style={getRootContainerStyles(sceneProperties)}
        ref={containerRef}
      />
      <div
        id="append-container"
        style={{
          zIndex: -1,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </>
  );
};
