"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSceneFunctions = void 0;
const react_1 = require("react");
const startSceneElementAnimations_1 = require("../animation/animation-manager/startSceneElementAnimations");
const useSceneFunctions = (sceneFunctions) => (0, react_1.useMemo)(() => {
    const defaultSceneFunctions = {
        onTimeUpdate: (scene) => {
            (0, startSceneElementAnimations_1.startSceneElementAnimations)(scene);
        },
    };
    if (sceneFunctions) {
        return Object.assign(Object.assign({}, defaultSceneFunctions), sceneFunctions);
    }
    return defaultSceneFunctions;
}, []);
exports.useSceneFunctions = useSceneFunctions;
