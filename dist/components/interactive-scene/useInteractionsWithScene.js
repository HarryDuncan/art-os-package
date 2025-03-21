"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInteractionsWithScene = void 0;
const react_1 = require("react");
const interaction_consts_1 = require("../../interaction/interaction.consts");
const useInteractionsWithScene = (interactionEvents) => {
    const sceneInteractionEvents = (0, react_1.useMemo)(() => interactionEvents.flatMap((interactionEvent) => {
        return interactionEvent.bindingType !== interaction_consts_1.EVENT_BINDING_TYPE.MATERIAL
            ? interactionEvent
            : [];
    }), [interactionEvents]);
    return (0, react_1.useCallback)((scene) => {
        scene.addInteractionEvents(sceneInteractionEvents);
    }, [sceneInteractionEvents]);
};
exports.useInteractionsWithScene = useInteractionsWithScene;
