import { useSceneContext } from "../../context/context";
import { INTERACTION_SOURCES } from "../../interaction/consts";

import { PoseNode } from "./PoseNode";

export const ExternalInteractionNode = () => {
  const { interactionConfigs } = useSceneContext();

  return (
    <>
      {interactionConfigs.map((config) => {
        switch (config.interactionSource) {
          case INTERACTION_SOURCES.POSE_ESTIMATION:
            return <PoseNode config={config} />;
          case INTERACTION_SOURCES.MASK_DETECTION:
          default:
            return null;
        }
      })}
    </>
  );
};
