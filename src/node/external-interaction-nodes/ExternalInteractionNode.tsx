import { INTERACTION_SOURCES } from "../../interaction/interaction.consts";
import { InteractionConfig } from "../../interaction/interaction.types";
import { PoseNode } from "./PoseNode";

interface ExternalInteractionNodeProps {
  externalInteractionConfig: InteractionConfig[];
}
export const ExternalInteractionNode = ({
  externalInteractionConfig,
}: ExternalInteractionNodeProps) => {
  return (
    <>
      {externalInteractionConfig.map((config) => {
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
