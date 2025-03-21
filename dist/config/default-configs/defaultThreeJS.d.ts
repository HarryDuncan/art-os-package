export declare const DEFAULT_THREE_JS: {
    camera: {
        cameraType: "PERSPECTIVE_CAMERA" | "ORTHOGRAPHIC_CAMERA";
        position: {
            x: number;
            y: number;
            z: number;
        };
        perspectiveCameraProps: {
            fov: number;
            aspect: number;
            near: number;
            far: number;
        };
        orthographicCameraProps: {
            frustumSize: number;
        };
    };
    renderer: {
        rendererType: string;
        outputEncoding: any;
        clearColor: number;
        alpha: number;
    };
};
