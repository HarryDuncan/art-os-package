"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThreeJsFromConfig = void 0;
const react_1 = require("react");
const useCamera_1 = require("./use-camera/useCamera");
const useThreeJsFromConfig = () => {
    const setUpCamera = (0, useCamera_1.useSetUpCamera)();
    const setUpControls = useSetUpControls();
    return (0, react_1.useCallback)((config) => {
        const camera = setUpCamera(config === null || config === void 0 ? void 0 : config.camera);
        const controls = setUpControls(config === null || config === void 0 ? void 0 : config.controls);
        return {
            camera,
            controls,
        };
    }, [setUpCamera, setUpControls]);
};
exports.useThreeJsFromConfig = useThreeJsFromConfig;
const useSetUpControls = () => (0, react_1.useCallback)((controlsConfig) => controlsConfig
    ? Object.assign({}, controlsConfig) : {}, []);
