import { useEffect } from "react";
export const useEvents = (scene, eventConfig = []) => {
    useEffect(() => {
        if ((scene === null || scene === void 0 ? void 0 : scene.addEvents) && scene.eventsSet === false) {
            scene.addEvents(eventConfig);
        }
    }, [scene, scene.eventsSet, eventConfig]);
};
