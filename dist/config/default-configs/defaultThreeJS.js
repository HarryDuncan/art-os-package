"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_THREE_JS = void 0;
const three_1 = require("three");
const rendererConstants_1 = require("../../hooks/use-three-js/renderer/rendererConstants");
const camera_types_1 = require("../../config/three-js/use-camera/camera.types");
exports.DEFAULT_THREE_JS = {
    camera: {
        cameraType: camera_types_1.CAMERA_TYPES.PERSPECTIVE_CAMERA,
        position: {
            x: 0,
            y: 0,
            z: 2,
        },
        perspectiveCameraProps: {
            fov: 45,
            aspect: window.innerWidth / window.innerHeight,
            near: 1,
            far: 1000,
        },
        orthographicCameraProps: {
            frustumSize: 1,
        },
    },
    renderer: {
        rendererType: rendererConstants_1.RENDERER_TYPES.WEBGL,
        outputEncoding: three_1.sRGBEncoding,
        clearColor: 0x000000,
        alpha: 0,
    },
};
