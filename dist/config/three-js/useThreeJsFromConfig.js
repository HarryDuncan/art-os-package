import { useCallback } from "react";
import { useSetUpCamera } from "./use-camera/useCamera";
export const useThreeJsFromConfig = () => {
    const setUpCamera = useSetUpCamera();
    const setUpControls = useSetUpControls();
    return useCallback((config) => {
        const camera = setUpCamera(config === null || config === void 0 ? void 0 : config.camera);
        const controls = setUpControls(config === null || config === void 0 ? void 0 : config.controls);
        return {
            camera,
            controls,
        };
    }, [setUpCamera, setUpControls]);
};
const useSetUpControls = () => useCallback((controlsConfig) => controlsConfig
    ? Object.assign({}, controlsConfig) : {}, []);
