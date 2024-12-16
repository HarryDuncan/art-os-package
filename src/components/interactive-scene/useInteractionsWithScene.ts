import { useCallback, useMemo } from "react";
import { InteractiveScene, SceneInteraction } from "./InteractiveScene";
import { EVENT_BINDING_TYPE } from "interaction/interactions.consts";

export const useInteractionsWithScene = (
  interactionEvents: SceneInteraction[]
) => {
  const sceneInteractionEvents = useMemo(
    () =>
      interactionEvents.flatMap((interactionEvent) => {
        return interactionEvent.bindingType !== EVENT_BINDING_TYPE.MATERIAL
          ? interactionEvent
          : [];
      }),
    [interactionEvents]
  );
  return useCallback(
    (scene: InteractiveScene) => {
      scene.addInteractionEvents(sceneInteractionEvents as SceneInteraction[]);
    },
    [sceneInteractionEvents]
  );
};
