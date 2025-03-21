"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOrbitControls = void 0;
const react_1 = require("react");
const three_1 = require("three");
const OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
const useOrbitControls = (camera, renderer, config) => {
    return (0, react_1.useMemo)(() => {
        if (!camera || !renderer || !renderer.domElement || !config)
            return null;
        const controls = new OrbitControls_1.OrbitControls(camera, renderer.domElement);
        controls.listenToKeyEvents(window); // optional
        controls.mouseButtons = {
            LEFT: three_1.MOUSE.ROTATE,
            MIDDLE: three_1.MOUSE.DOLLY,
            RIGHT: three_1.MOUSE.PAN,
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
exports.useOrbitControls = useOrbitControls;
