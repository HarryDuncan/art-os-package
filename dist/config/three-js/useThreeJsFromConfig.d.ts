import { ThreeJSConfig } from "../config.types";
export declare const useThreeJsFromConfig: () => (config: ThreeJSConfig) => {
    camera: any;
    controls: {
        autoRotate?: boolean;
        autoRotateSpeed?: number;
        dampingFactor?: number;
        enabled?: boolean;
        enableDamping?: boolean;
        enablePan?: boolean;
        enableRotate?: boolean;
        enableZoom?: boolean;
        keyPanSpeed?: number;
        keys?: {
            LEFT: string;
            UP: string;
            RIGHT: string;
            BOTTOM: string;
        };
        maxAzimuthAngle?: number;
        maxDistance?: number;
        maxPolarAngle?: number;
        maxZoom?: number;
        minAzimuthAngle?: number;
        minDistance?: number;
        minPolarAngle?: number;
        minZoom?: number;
        mouseButtons?: {
            LEFT: number;
            MIDDLE: number;
            RIGHT: number;
        };
        rotateSpeed?: number;
        screenSpacePanning?: boolean;
        touches?: {
            ONE: number;
            TWO: number;
        };
    };
};
