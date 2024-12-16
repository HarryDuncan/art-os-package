import { useEffect } from "react";
import { EventConfig } from "./events.types";
import { InteractiveScene } from "components/interactive-scene/InteractiveScene";

export const useEvents = (
  scene: InteractiveScene,
  eventConfig: EventConfig[] = []
) => {
  useEffect(() => {
    if (scene?.addEvents && scene.eventsSet === false) {
      scene.addEvents(eventConfig);
    }
  }, [scene, scene.eventsSet, eventConfig]);
};
