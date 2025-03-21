"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEvents = void 0;
const react_1 = require("react");
const useEvents = (scene, eventConfig = []) => {
    (0, react_1.useEffect)(() => {
        if ((scene === null || scene === void 0 ? void 0 : scene.addEvents) && scene.eventsSet === false) {
            scene.addEvents(eventConfig);
        }
    }, [scene, scene.eventsSet, eventConfig]);
};
exports.useEvents = useEvents;
