"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSetUpCamera = void 0;
const react_1 = require("react");
const three_1 = require("three");
const camera_types_1 = require("./camera.types");
const windowStateProvider_1 = require("../../../compat/window-state/windowStateProvider");
const camera_consts_1 = require("./camera.consts");
const conversion_1 = require("../../../utils/conversion/conversion");
const useSetUpCamera = () => {
    const { state: { windowSize: { width, height }, }, } = (0, windowStateProvider_1.useWindowState)();
    const aspect = width / height;
    return (0, react_1.useCallback)((config) => {
        var _a;
        const camera = getCamera(aspect, config);
        const { x, y, z } = (0, conversion_1.positionConfigToPosition)((_a = config === null || config === void 0 ? void 0 : config.position) !== null && _a !== void 0 ? _a : {});
        camera.position.set(x, y, z);
        return camera;
    }, [aspect]);
};
exports.useSetUpCamera = useSetUpCamera;
const getCamera = (aspect, config) => {
    switch (config === null || config === void 0 ? void 0 : config.cameraType) {
        case camera_types_1.CAMERA_TYPES.ORTHOGRAPHIC_CAMERA: {
            const { orthographicCameraConfig = camera_consts_1.DEFAULT_ORTHOGRAPHIC } = config || {};
            const { frustumSize } = orthographicCameraConfig;
            const camera = new three_1.OrthographicCamera(frustumSize / -2, frustumSize / 2, frustumSize / 2, frustumSize / -2, -1000, 1000);
            return camera;
        }
        case camera_types_1.CAMERA_TYPES.PERSPECTIVE_CAMERA:
        default: {
            const { perspectiveCameraConfig = camera_consts_1.DEFAULT_PERSPECTIVE } = config || {};
            const { fov, near, far } = perspectiveCameraConfig;
            const camera = new three_1.PerspectiveCamera(fov, aspect, near, far);
            return camera;
        }
    }
};
