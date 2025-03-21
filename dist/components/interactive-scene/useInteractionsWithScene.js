import { useCallback, useMemo } from "react";
import { EVENT_BINDING_TYPE } from "../../interaction/interaction.consts";
export const useInteractionsWithScene = (interactionEvents) => {
    const sceneInteractionEvents = useMemo(() => interactionEvents.flatMap((interactionEvent) => {
        return interactionEvent.bindingType !== EVENT_BINDING_TYPE.MATERIAL
            ? interactionEvent
            : [];
    }), [interactionEvents]);
    return useCallback((scene) => {
        scene.addInteractionEvents(sceneInteractionEvents);
    }, [sceneInteractionEvents]);
};
