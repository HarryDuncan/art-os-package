import { useMemo } from "react";
import { MOUSE } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export const useOrbitControls = (camera, renderer, config) => {
    return useMemo(() => {
        if (!camera || !renderer || !renderer.domElement || !config)
            return null;
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.listenToKeyEvents(window); // optional
        controls.mouseButtons = {
            LEFT: MOUSE.ROTATE,
            MIDDLE: MOUSE.DOLLY,
            RIGHT: MOUSE.PAN,
        };
        controls.screenSpacePanning = false;
        controls.enablePan = false;
        Object.keys(config).forEach((key) => {
            const controlKey = key;
            const configValue = config[key];
            // @ts-ignore
            controls[controlKey] = configValue;
        });
        return controls;
    }, [renderer, camera, config]);
};
